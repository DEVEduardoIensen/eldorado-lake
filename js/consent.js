/**
 * Gerenciador de Consentimento de Cookies, Métricas e Mídias Externas (LGPD / ANPD)
 * Bloqueia telemetria não essencial e incorporações de terceiros até autorização explícita.
 */
(function () {
    'use strict';

    const STORAGE_KEY = 'eldorado_consent_v1';
    const CONSENT_VERSION = 1;
    const FOCUSABLE_SELECTOR = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    let memoryFallback = null;
    let lastTriggerEl = null;
    let analyticsLoadedInSession = false;
    let uiInjected = false;

    function createDefaultState(decided) {
        return {
            version: CONSENT_VERSION,
            decided: Boolean(decided),
            essential: true,
            analytics: false,
            externalMedia: false,
            updatedAt: null
        };
    }

    function readStoredConsent() {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                return memoryFallback;
            }
            const parsed = JSON.parse(raw);
            if (!parsed || typeof parsed !== 'object' || parsed.version !== CONSENT_VERSION) {
                return null;
            }
            return {
                version: CONSENT_VERSION,
                decided: true,
                essential: true,
                analytics: Boolean(parsed.analytics),
                externalMedia: Boolean(parsed.externalMedia),
                updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : null
            };
        } catch (_err) {
            return memoryFallback;
        }
    }

    function writeStoredConsent(state) {
        const payload = {
            version: CONSENT_VERSION,
            decided: true,
            essential: true,
            analytics: Boolean(state.analytics),
            externalMedia: Boolean(state.externalMedia),
            updatedAt: new Date().toISOString()
        };
        memoryFallback = payload;
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        } catch (_err) {
            // Ambiente com armazenamento restrito: mantém em memória na sessão atual.
        }
        return payload;
    }

    function getState() {
        return readStoredConsent() || createDefaultState(false);
    }

    function hasConsent(category) {
        if (category === 'essential') {
            return true;
        }
        const state = getState();
        if (category === 'analytics') {
            return Boolean(state.decided && state.analytics);
        }
        if (category === 'externalMedia') {
            return Boolean(state.decided && state.externalMedia);
        }
        return false;
    }

    function isPublicHttpEnvironment() {
        const host = window.location.hostname || '';
        return (
            window.location.protocol.startsWith('http') &&
            !host.includes('localhost') &&
            host !== '127.0.0.1' &&
            host !== '[::1]'
        );
    }

    function loadVercelAnalytics() {
        if (analyticsLoadedInSession || !isPublicHttpEnvironment()) {
            return;
        }
        if (document.querySelector('script[data-vercel-insights]')) {
            analyticsLoadedInSession = true;
            return;
        }
        window.va = window.va || function () {
            (window.vaq = window.vaq || []).push(arguments);
        };
        const vs = document.createElement('script');
        vs.defer = true;
        vs.src = '/_vercel/insights/script.js';
        vs.setAttribute('data-vercel-insights', 'true');
        document.head.appendChild(vs);
        analyticsLoadedInSession = true;
    }

    function applyExternalMediaState(allowed) {
        const mapBoxes = document.querySelectorAll('.consent-map-box');
        mapBoxes.forEach((box) => {
            const iframe = box.querySelector('iframe[data-consent-src]');
            const placeholder = box.querySelector('.consent-map-placeholder');
            if (!iframe) {
                return;
            }
            if (allowed) {
                const targetSrc = iframe.getAttribute('data-consent-src');
                if (targetSrc && iframe.getAttribute('src') !== targetSrc) {
                    iframe.setAttribute('src', targetSrc);
                }
                iframe.removeAttribute('hidden');
                if (placeholder) {
                    placeholder.setAttribute('hidden', '');
                }
            } else {
                if (iframe.hasAttribute('src')) {
                    iframe.removeAttribute('src');
                }
                iframe.setAttribute('hidden', '');
                if (placeholder) {
                    placeholder.removeAttribute('hidden');
                }
            }
        });
    }

    function syncModalInputs(state) {
        const analyticsInput = document.getElementById('consent-toggle-analytics');
        const mediaInput = document.getElementById('consent-toggle-media');
        if (analyticsInput) {
            analyticsInput.checked = Boolean(state.analytics);
        }
        if (mediaInput) {
            mediaInput.checked = Boolean(state.externalMedia);
        }
    }

    let heroBannerRevealed = false;
    let heroScrollListenerBound = false;

    function getHeroRevealThreshold() {
        const heroEl = document.getElementById('hero');
        if (!heroEl) {
            return 0;
        }
        const viewportH = window.innerHeight || document.documentElement.clientHeight || 800;
        const heroHeight = heroEl.offsetHeight || viewportH;
        // Revela somente após o visitante descer pela seção hero, preservando o impacto visual inicial
        return Math.max(200, Math.round(heroHeight * 0.5));
    }

    function canRevealBannerOnCurrentScroll() {
        if (heroBannerRevealed) {
            return true;
        }
        const heroEl = document.getElementById('hero');
        if (!heroEl) {
            heroBannerRevealed = true;
            return true;
        }
        const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
        if (scrollY >= getHeroRevealThreshold()) {
            heroBannerRevealed = true;
            return true;
        }
        return false;
    }

    function bindHeroScrollReveal() {
        if (heroScrollListenerBound) {
            return;
        }
        const heroEl = document.getElementById('hero');
        if (!heroEl) {
            return;
        }
        heroScrollListenerBound = true;
        const onViewportChange = () => {
            const current = getState();
            if (current.decided) {
                window.removeEventListener('scroll', onViewportChange);
                window.removeEventListener('resize', onViewportChange);
                window.removeEventListener('hashchange', onViewportChange);
                return;
            }
            if (canRevealBannerOnCurrentScroll()) {
                window.removeEventListener('scroll', onViewportChange);
                window.removeEventListener('resize', onViewportChange);
                window.removeEventListener('hashchange', onViewportChange);
                updateBannerVisibility(current);
            }
        };
        window.addEventListener('scroll', onViewportChange, { passive: true });
        window.addEventListener('resize', onViewportChange, { passive: true });
        window.addEventListener('hashchange', onViewportChange, { passive: true });
        if (document.readyState !== 'complete') {
            window.addEventListener('load', onViewportChange, { once: true });
        }
    }

    function updateBannerVisibility(state) {
        const banner = document.getElementById('cookie-banner');
        if (!banner) {
            return;
        }
        if (state.decided) {
            banner.setAttribute('hidden', '');
            banner.classList.remove('active');
            return;
        }
        if (!canRevealBannerOnCurrentScroll()) {
            banner.setAttribute('hidden', '');
            banner.classList.remove('active');
            bindHeroScrollReveal();
            return;
        }
        banner.removeAttribute('hidden');
        banner.classList.add('active');
    }

    function announceStatus(message) {
        const liveEl = document.getElementById('consent-live-status');
        if (!liveEl) {
            return;
        }
        liveEl.textContent = '';
        window.setTimeout(() => {
            liveEl.textContent = message;
        }, 40);
    }

    function applyConsent(state, options) {
        const opts = options || {};
        if (state.decided && state.analytics) {
            loadVercelAnalytics();
        }
        applyExternalMediaState(Boolean(state.decided && state.externalMedia));
        syncModalInputs(state);
        updateBannerVisibility(state);

        window.dispatchEvent(new CustomEvent('eldorado:consent-changed', {
            detail: { state: state }
        }));

        if (opts.announce) {
            if (!state.analytics && analyticsLoadedInSession) {
                announceStatus('Preferências de privacidade salvas. Recarregue a página para interromper scripts de métricas já carregados.');
            } else {
                announceStatus('Preferências de privacidade atualizadas.');
            }
        }
    }

    function updateConsent(nextPartial, options) {
        const current = getState();
        const saved = writeStoredConsent({
            analytics: typeof nextPartial.analytics === 'boolean' ? nextPartial.analytics : current.analytics,
            externalMedia: typeof nextPartial.externalMedia === 'boolean' ? nextPartial.externalMedia : current.externalMedia
        });
        applyConsent(saved, options || { announce: true });
        return saved;
    }

    function acceptAll() {
        const saved = updateConsent({ analytics: true, externalMedia: true }, { announce: true });
        closePreferences();
        return saved;
    }

    function rejectNonEssential() {
        const saved = updateConsent({ analytics: false, externalMedia: false }, { announce: true });
        closePreferences();
        return saved;
    }

    function saveFromModal() {
        const analyticsInput = document.getElementById('consent-toggle-analytics');
        const mediaInput = document.getElementById('consent-toggle-media');
        const saved = updateConsent({
            analytics: Boolean(analyticsInput && analyticsInput.checked),
            externalMedia: Boolean(mediaInput && mediaInput.checked)
        }, { announce: true });
        closePreferences();
        return saved;
    }

    function grantCategory(category) {
        if (category === 'analytics') {
            return updateConsent({ analytics: true }, { announce: true });
        }
        if (category === 'externalMedia') {
            return updateConsent({ externalMedia: true }, { announce: true });
        }
        return getState();
    }

    function handleModalKeydown(e) {
        const modal = document.getElementById('cookie-modal');
        if (!modal || !modal.classList.contains('active')) {
            return;
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            closePreferences();
            return;
        }
        if (e.key !== 'Tab') {
            return;
        }
        const focusables = Array.from(modal.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
            (el) => el.offsetParent !== null || el.getClientRects().length > 0
        );
        if (focusables.length === 0) {
            return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && (document.activeElement === first || !modal.contains(document.activeElement))) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && (document.activeElement === last || !modal.contains(document.activeElement))) {
            e.preventDefault();
            first.focus();
        }
    }

    function openPreferences(triggerEl) {
        injectConsentUI();
        const modal = document.getElementById('cookie-modal');
        if (!modal) {
            return;
        }
        lastTriggerEl = triggerEl || document.activeElement;
        syncModalInputs(getState());
        modal.removeAttribute('hidden');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        const closeBtn = modal.querySelector('.cookie-modal-close');
        window.setTimeout(() => {
            if (closeBtn) {
                closeBtn.focus();
            }
        }, 20);
    }

    function closePreferences() {
        const modal = document.getElementById('cookie-modal');
        if (!modal || !modal.classList.contains('active')) {
            return;
        }
        modal.classList.remove('active');
        modal.setAttribute('hidden', '');

        const detailsModal = document.getElementById('details-modal');
        const lightbox = document.getElementById('lightbox');
        const anyOtherModalOpen =
            (detailsModal && detailsModal.classList.contains('active')) ||
            (lightbox && lightbox.classList.contains('active'));
        if (!anyOtherModalOpen) {
            document.body.style.overflow = '';
        }

        if (lastTriggerEl && typeof lastTriggerEl.focus === 'function' && document.contains(lastTriggerEl)) {
            lastTriggerEl.focus();
        }
        lastTriggerEl = null;
    }

    function buildBannerMarkup() {
        return `
            <aside id="cookie-banner" class="cookie-banner" role="region" aria-labelledby="cookie-banner-title" hidden>
                <div class="cookie-banner-content">
                    <div class="cookie-banner-text">
                        <h2 id="cookie-banner-title" class="cookie-banner-title">Privacidade e Cookies</h2>
                        <p>
                            Usamos armazenamento essencial e, com sua permissão, análises e mídias externas (<a href="privacy.html">Política de Privacidade</a>).
                        </p>
                    </div>
                    <div class="cookie-banner-actions">
                        <button type="button" class="cookie-btn cookie-btn-secondary" id="cookie-btn-reject" aria-label="Recusar cookies não essenciais">
                            Recusar
                        </button>
                        <button type="button" class="cookie-btn cookie-btn-outline" id="cookie-btn-customize" aria-label="Configurar preferências de cookies">
                            Configurar
                        </button>
                        <button type="button" class="cookie-btn cookie-btn-primary" id="cookie-btn-accept" aria-label="Aceitar todos os cookies e mídias externas">
                            Aceitar
                        </button>
                    </div>
                </div>
            </aside>
        `;
    }

    function buildModalMarkup() {
        return `
            <div id="cookie-modal" class="cookie-modal" role="dialog" aria-modal="true" aria-labelledby="cookie-modal-title" hidden>
                <div class="cookie-modal-backdrop" data-cookie-close="true"></div>
                <div class="cookie-modal-panel">
                    <div class="cookie-modal-header">
                        <h2 id="cookie-modal-title">Preferências de Privacidade e Cookies</h2>
                        <button type="button" class="cookie-modal-close" aria-label="Fechar janela de preferências de cookies">
                            &times;
                        </button>
                    </div>
                    <div class="cookie-modal-body">
                        <p class="cookie-modal-intro">
                            Gerencie como o site da Eldorado Lake pode utilizar tecnologias não essenciais.
                            O carregamento das fontes tipográficas (Google Fonts) ocorre apenas por requisição técnica de exibição da página.
                            Saiba mais na <a href="privacy.html">Política de Privacidade</a>.
                        </p>

                        <div class="cookie-category-list">
                            <div class="cookie-category-item">
                                <div class="cookie-category-head">
                                    <div>
                                        <h3>Cookies e Armazenamento Essenciais</h3>
                                        <p>Necessários para funcionamento básico e registro desta escolha (chave local <code>eldorado_consent_v1</code>). Sempre ativos.</p>
                                    </div>
                                    <span class="cookie-always-on">Sempre ativo</span>
                                </div>
                            </div>

                            <div class="cookie-category-item">
                                <div class="cookie-category-head">
                                    <label for="consent-toggle-analytics" class="cookie-category-label">
                                        <strong>Métricas e Desempenho (Vercel Web Analytics)</strong>
                                        <span>Mede páginas visitadas, origem do acesso e tipo de dispositivo para melhorias do site. Permanece bloqueado sem seu consentimento.</span>
                                    </label>
                                    <input type="checkbox" id="consent-toggle-analytics" class="cookie-switch">
                                </div>
                            </div>

                            <div class="cookie-category-item">
                                <div class="cookie-category-head">
                                    <label for="consent-toggle-media" class="cookie-category-label">
                                        <strong>Mapas e Mídias Externas (Google Maps, YouTube e Instagram)</strong>
                                        <span>Carrega o mapa interativo e reprodutores incorporados de terceiros (Google/YouTube e Meta), que podem tratar seu IP e utilizar cookies próprios.</span>
                                    </label>
                                    <input type="checkbox" id="consent-toggle-media" class="cookie-switch">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cookie-modal-footer">
                        <button type="button" class="cookie-btn cookie-btn-secondary" id="cookie-modal-reject">
                            Rejeitar não essenciais
                        </button>
                        <button type="button" class="cookie-btn cookie-btn-outline" id="cookie-modal-save">
                            Salvar preferências
                        </button>
                        <button type="button" class="cookie-btn cookie-btn-primary" id="cookie-modal-accept">
                            Aceitar todos
                        </button>
                    </div>
                </div>
            </div>
            <div id="consent-live-status" class="sr-only" aria-live="polite" aria-atomic="true"></div>
        `;
    }

    function injectConsentUI() {
        if (uiInjected || !document.body) {
            return;
        }
        uiInjected = true;
        const container = document.createElement('div');
        container.id = 'eldorado-consent-root';
        container.innerHTML = buildBannerMarkup() + buildModalMarkup();
        document.body.appendChild(container);

        document.getElementById('cookie-btn-accept').addEventListener('click', acceptAll);
        document.getElementById('cookie-btn-reject').addEventListener('click', rejectNonEssential);
        document.getElementById('cookie-btn-customize').addEventListener('click', (e) => openPreferences(e.currentTarget));

        document.getElementById('cookie-modal-accept').addEventListener('click', acceptAll);
        document.getElementById('cookie-modal-reject').addEventListener('click', rejectNonEssential);
        document.getElementById('cookie-modal-save').addEventListener('click', saveFromModal);

        const modal = document.getElementById('cookie-modal');
        modal.querySelector('.cookie-modal-close').addEventListener('click', closePreferences);
        modal.querySelector('[data-cookie-close="true"]').addEventListener('click', closePreferences);
        document.addEventListener('keydown', handleModalKeydown);

        bindDynamicElements();
        applyConsent(getState(), { announce: false });
    }

    function bindTrigger(el) {
        if (!el || el.dataset.consentBound === 'true') {
            return;
        }
        el.dataset.consentBound = 'true';
        el.addEventListener('click', (e) => {
            e.preventDefault();
            openPreferences(e.currentTarget);
        });
    }

    function bindDynamicElements() {
        document.querySelectorAll('[data-open-cookie-preferences]').forEach(bindTrigger);
        document.querySelectorAll('[data-consent-grant="externalMedia"]').forEach((btn) => {
            if (btn.dataset.consentGrantBound === 'true') {
                return;
            }
            btn.dataset.consentGrantBound = 'true';
            btn.addEventListener('click', () => {
                grantCategory('externalMedia');
            });
        });
    }

    function init() {
        injectConsentUI();
        applyConsent(getState(), { announce: false });
    }

    // Caso o usuário já tenha optado por analytics em visita anterior, permite carregamento imediato
    if (hasConsent('analytics')) {
        loadVercelAnalytics();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.EldoradoConsent = {
        getState: getState,
        hasConsent: hasConsent,
        grantCategory: grantCategory,
        acceptAll: acceptAll,
        rejectNonEssential: rejectNonEssential,
        openPreferences: openPreferences,
        closePreferences: closePreferences,
        bindTrigger: bindTrigger,
        bindDynamicElements: bindDynamicElements
    };
})();
