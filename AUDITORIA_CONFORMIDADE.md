# Auditoria Jurídica, LGPD, Segurança, Acessibilidade e Responsividade — Eldorado Lake

**Data da Auditoria:** 13 de novembro de 2026  
**Escopo Técnico:** Site institucional e comercial da operação de pesca esportiva **Eldorado Lake / Rancho Eldorado** (`c:\Users\User\Desktop\SITE\eldorado-lake`, site estático em HTML5, CSS3 e JavaScript ES6+ preparado para hospedagem na Vercel).  
**Identificação Confirmada pelo Proprietário:** Eldorado Lake — **CNPJ 17.227.623/0001-04**, operação representada por **Thiago Witeck**, situada em Faxinal do Céu, Pinhão - PR, CEP 85170-000.  
**Nota de Governança:** Este relatório documenta alterações técnicas reais aplicadas no repositório e os testes executados após as edições finais. A aprovação de conformidade automatizada **não substitui validação jurídica formal por advogado**.

---

## 1. Resumo da Arquitetura Levantada (Etapa 1 — Investigação)

- **Stack e Hospedagem:** Site estático Vanilla (HTML5, CSS3, JS ES6+) + `GSAP` e `ScrollTrigger` locais em `js/vendor/` + `FontAwesome` CSS/webfonts locais em `css/vendor/` + `Google Fonts` (`Outfit`, `Inter`) + função serverless simples em `api/markdown.js` (`text/markdown` para agentes) + regras de roteamento e cabeçalhos HTTP em `vercel.json` e `_redirects`.
- **Banco de Dados, Login e Formulários:** Inexistentes. O site não possui área autenticada, banco de dados exposto, carrinho próprio de pagamento nem formulários HTML automáticos de envio de dados. As contratações de pesca e hospedagem acontecem por atendimento direto via **WhatsApp** (`https://wa.me/5542999162340`) e **e-mail** (`thiagowiteck@hotmail.com`); a compra de produtos/iscas ocorre em ambiente externo no **Mercado Livre** (`https://lista.mercadolivre.com.br/_CustId_82673092`).
- **Rastreadores e Terceiros Identificados Antes da Correção:**
  - `Vercel Web Analytics` (`/_vercel/insights/script.js`), antes carregado imediatamente no `head` de `index.html`;
  - `Google Maps` (incorporado via `iframe` com carregamento imediato na inicialização em `index.html` e `contact.html`);
  - `YouTube` e `Instagram Reels` (carregados sob clique de cards de vídeo no lightbox, sendo o YouTube no domínio padrão em vez de `youtube-nocookie.com` e sem bloqueio prévio de consentimento);
  - Não havia Google Analytics (`GA4`), Google Ads Tag nem Meta Pixel instalados no código.
- **Armazenamento Local Implementado:** Chave `eldorado_consent_v1` em `localStorage` para registrar apenas a escolha do visitante (essenciais sempre ativos, `analytics` e `externalMedia` desativados por padrão até escolha positiva).
- **Falhas Críticas Corrigidas na Investigação:**
  - Links de WhatsApp em HTML, JS e arquivos para LLMs omitiam o nono dígito (`9`), enquanto o texto visível mostrava `(42) 99916-2340` — corrigido em **100% do repositório** para `https://wa.me/5542999162340` após confirmação do proprietário;
  - Marcação JSON-LD de `index.html` continha alegações fictícias ou não sustentadas (`"contactOption": "TollFree"`, `"availableLanguage": ["Portuguese", "English", "Spanish"]`, `"aggregateRating"` estática com `ratingValue: 5.0`, citação a `ar-condicionado` e `pensão completa`) — removidas/harmonizadas;
  - Inspeção visual dos ativos (`rancho_6.webp`, `gallery_31/35/40.webp`, `gallery_38.webp` e contagem real da galeria): a galeria contém **43 fotos** (`gallery_24.webp` não existe); os quartos exibem ventilador portátil (sem ar-condicionado); os certificados BGFA referem-se ao recorde de Dourado em **caiaque de 73 cm (21/06/2023)**; e `gallery_38.webp` exibe um menor de idade (criança) embarcado.

---

## 2. Matriz dos 17 Requisitos

| # | Requisito | Classificação | Resumo Objetivo |
| :-: | :--- | :--- | :--- |
| 1 | Política de Privacidade | **Exige revisão jurídica** *(e Pendente de informações)* | Atualizada com práticas reais, trackers sob demanda, bases legais (LGPD art. 7º), direitos (art. 18), transferência internacional (art. 33) e CNPJ `17.227.623/0001-04`; pendente Razão Social completa e revisão advocatícia/DPO. |
| 2 | Termos de Serviço | **Exige revisão jurídica** | Revisados com regras de uso do site, PI, contratação, Pesque & Solte, segurança náutica, CDC, CNPJ `17.227.623/0001-04` e remoção de menção indevida a refeições incluídas no pacote padrão. |
| 3 | Aviso de Cookies | **Parcialmente implementado** | Implementado `js/consent.js` com banner compacto (`Recusar`, `Configurar`, `Aceitar`), revelação adiada após rolagem de 50% da seção `#hero` na página inicial (exibição imediata nas demais páginas, mantendo rastreadores/mídias bloqueados antes da decisão), modal granular e reabertura no rodapé. Validado na sintaxe e em simulação unitária/DOM estático; teste interativo em navegador real bloqueado por ausência de depuração remota no Chrome. |
| 4 | Política de Reembolso | **Exige revisão jurídica** | Criada `refund.html` cobrindo direito de arrependimento (CDC art. 49 — 7 dias), reagendamento, cancelamento climático/operacional (arts. 20 e 35), compras no Mercado Livre e CNPJ `17.227.623/0001-04`. Redirecionamentos e sitemap atualizados. |
| 5 | Formulários e LGPD | **Implementado e testado** *(sem formulários HTML: Não aplicável a inputs; avisos ativos)* | Site estático sem formulários HTML nem caixas pré-marcadas. Adicionados avisos informativos de LGPD junto aos blocos de contato (WhatsApp/e-mail) em `index.html`, `contact.html` e modal de pacotes. |
| 6 | Coleta Mínima de Dados | **Implementado e testado** | Nenhuma coleta desnecessária nas páginas; `youtube-nocookie.com` aplicado nos embeds; armazenamento local restrito a `eldorado_consent_v1`. |
| 7 | Scripts e Tracking | **Parcialmente implementado** | Vercel Web Analytics, Google Maps, YouTube e Instagram bloqueados até consentimento explícito no código (`js/consent.js`, `js/script.js`, `index.html`, `contact.html`). Verificação automática de ausência de `src`/`script` pré-consentimento passou; execução ao vivo no Chrome pendente. |
| 8 | Acessibilidade (WCAG 2.2 AA) | **Parcialmente implementado** | Skip links em todas as páginas, `aria-expanded`/`aria-controls`/`aria-hidden`, focus trap em modais, alvo mínimo `>= 24px`/`44px`, hierarquia `h1->h2->h3->h4` sem saltos e regras `@media (prefers-reduced-motion: reduce)` e `forced-colors`. Auditoria de DOM/hierarquia passou; leitura com leitor de tela/Chrome visual pendente. |
| 9 | Texto Alternativo nas Imagens | **Implementado e testado** | Todas as imagens verificadas visualmente receberam `alt` descritivos fiéis (8 fotos do Rancho, 11 fotos do Barco, 43 fotos da Galeria, thumbs de vídeos, logo e Mercado Livre); ícones puramente decorativos marcados com `aria-hidden="true"`. Zero `<img>` sem `alt` nas 7 páginas. |
| 10 | Contrastes Corrigidos | **Implementado e testado** | Cores corrigidas em `.btn-whatsapp` (`#15803d` com `#ffffff` = `5.02:1`), `.cta-epic-btn` (`#15803d`/`#0f6b4e` com `#ffffff` = `5.02:1`–`6.49:1`) e scrim escuro reforçado em `.hero-overlay`. Todas as combinações medidas por cálculo WCAG >= `4.5:1`. |
| 11 | Navegação por Teclado | **Parcialmente implementado** | Foco visível global (`outline`), foco interno em cards/slides com `overflow: hidden`, conversão dos indicadores para `<button>`, navegação por `Tab`, `Enter`/`Space` (sem scroll acidental), `Escape` com restauração de foco e setas no Lightbox. Validado no código e IDs; teste prático de teclado no Chrome pendente. |
| 12 | Avaliações Falsas | **Implementado e testado** | Não existem depoimentos fictícios em tela. Removidas as marcações ocultas de `aggregateRating: 5.0` no JSON-LD (`index.html`) e `"Avaliação Google: 5.0 estrelas"` de `llms-full.txt`. |
| 13 | Promessas Falsas | **Parcialmente implementado** *(e Pendente de informações / Exige revisão jurídica)* | Corrigidas contradições fáticas no código (`ar-condicionado` / `quartos climatizados`, `refeições/pensão completa`, `TollFree`, atendimento `English/Spanish` em Schema.org e `llms*.txt`). Mantidas expressões comerciais históricas da landing page (`"167 km²"`, `"exemplares de até 94 cm"`, `"a maior e mais exclusiva"`) por dependerem de comprovação documental ou decisão do proprietário. |
| 14 | Direitos Autorais | **Pendente de informações** | Inventariadas bibliotecas técnicas (`GSAP`/`ScrollTrigger` locais, `FontAwesome`, `Google Fonts`) e conteúdo visual (fotos próprias, imagem promocional do Mercado Livre, marca/nomes de parceiros e foto com criança). Necessário guardar autorizações escritas de uso de imagem (especialmente `gallery_38.webp`), licenças comerciais/uso de marcas terceiras e conferência da licença aplicável ao GSAP. |
| 15 | Dados da Empresa | **Pendente de informações** | Publicado o **CNPJ 17.227.623/0001-04**, CEP `85170-000`, localidade `Faxinal do Céu, Pinhão - PR`, e-mail e WhatsApp corrigido `(42) 99916-2340` em rodapés, Schema.org e políticas. Faltam **Razão Social empresarial completa** e **endereço físico exato (logradouro/km/referência)** caso o proprietário deseje integralizar conforme o Decreto do E-commerce nº 7.962/2013. |
| 16 | Conformidade com a LGPD | **Exige revisão jurídica** *(e Pendente de informações)* | Mecanismos técnicos de transparência, opt-in, minimização e revogação aplicados no site. Pendentes aspectos operacionais internos (fluxo formal de atendimento a solicitações em 15 dias, controle de retenção no WhatsApp/e-mail e nomeação/canal formal do Encarregado quando aplicável). |
| 17 | Riscos Jurídicos | **Exige revisão jurídica** | Matriz completa de riscos classificada por gravidade (LGPD/ECA, CDC/E-commerce, Propriedade Intelectual, Publicidade, Segurança e Acessibilidade) detalhada na Seção 6 deste relatório. |

---

## 3. Alterações Implementadas por Arquivo

### Novos arquivos criados
- [`js/consent.js`](js/consent.js): gerenciador de consentimento (`window.EldoradoConsent`) em armazenamento local `eldorado_consent_v1`; injeta banner compacto e acessível (`Recusar`, `Configurar`, `Aceitar`) com revelação adiada até o visitante rolar além de 50% da seção `#hero` na home (mantendo scripts e mídias bloqueados enquanto não houver decisão, e exibindo imediatamente em subpáginas sem `#hero`), modal de preferências granulares (Essenciais, Vercel Analytics, Mapas e Mídias Externas), região `aria-live`, suporte a `Escape`/`Tab` com restauração de foco, bloqueio do script `/_vercel/insights/script.js` e desbloqueio dinâmico de mapas e vídeos.
- [`refund.html`](refund.html): Política de Cancelamento, Direito de Arrependimento (art. 49 do CDC — 7 dias), Reagendamento, Segurança Climática/Operacional (arts. 20, 35 e 51 do CDC), orientações para compras na loja do Mercado Livre e canais oficiais com CNPJ `17.227.623/0001-04`.
- [`AUDITORIA_CONFORMIDADE.md`](AUDITORIA_CONFORMIDADE.md): este relatório técnico e jurídico de auditoria.

### Arquivos modificados
- [`index.html`](index.html):
  - Remoção de carregamento automático de `/_vercel/insights/script.js` e transferência para `js/consent.js`;
  - Remoção de dados imprecisos/fictícios do JSON-LD (`TollFree`, `English`/`Spanish`, `aggregateRating`, menção a `ar-condicionado` e refeições completas no pacote) e inclusão de `"taxID": "17.227.623/0001-04"`;
  - Inclusão de skip link, `#mobile-menu-btn` com atributos ARIA, avisos `alt` descritivos nos 69 elementos visuais e `<button type="button" class="indicator">`;
  - Troca de embeds de YouTube para `youtube-nocookie.com` + atributos `data-external-url` e `data-provider`, gate `#lightbox-consent-gate`, bloqueio prévio do iframe do Google Maps (`.consent-map-box`) e ajuste de título/fechamento acessível no modal de pacotes (`<h2>`, botão `<button id="details-close-btn">`, nota legal `.details-legal-note`);
  - Correção de todos os links antigos de WhatsApp sem o nono dígito para `https://wa.me/5542999162340`; inclusão de CNPJ no bloco `#contato` e `.footer-bottom`; link para `refund.html` e botão `Preferências de Cookies` no rodapé; nota LGPD `.lgpd-contact-note` em texto discreto contínuo (sem card nem ícone); atualização de cache-busting (`style.css?v=35.2` e `consent.js?v=35.1`).
- [`privacy.html`](privacy.html): reescrita integral para LGPD (controlador com CNPJ `17.227.623/0001-04`, dados exatos coletados no atendimento e site estático, bases legais, terceiros/transferência internacional, retenção, segurança, direitos do art. 18, botão para gerir cookies, WhatsApp corrigido, menu mobile acessível, skip link e `style.css?v=35.2`).
- [`terms.html`](terms.html): revisão de termos de uso do site, propriedade intelectual, esclarecimento de que refeições não integram pacotes base fora de contratação personalizada, inclusão do CNPJ `17.227.623/0001-04`, remissão a `refund.html`, regras de Pesque & Solte e segurança náutica, foro do domicílio do consumidor (CDC art. 101, I), WhatsApp corrigido e menu mobile acessível.
- [`about.html`](about.html), [`contact.html`](contact.html), [`404.html`](404.html): padronização do cabeçalho móvel (`#mobile-menu-btn`), skip link, CNPJ `17.227.623/0001-04`, links `wa.me/5542999162340`, `refund.html` e `Preferências de Cookies` no rodapé; em `contact.html`, inclusão da nota LGPD em texto discreto (sem card nem ícone) e bloqueio prévio do mapa do Google Maps; em `404.html`, aliases `/reembolso` etc.
- [`data/packages.json`](data/packages.json): ajuste de `<h4>` para `<h3>` dentro do modal (respeitando `<h2>` no título do modal), `aria-hidden="true"` nos ícones e harmonização da estrutura de cozinha sem afirmação de ar-condicionado.
- [`css/style.css`](css/style.css):
  - Contraste corrigido em `.btn-whatsapp` e `.cta-epic-btn` + scrim reforçado em `.hero-overlay`;
  - Alvos acessíveis em `.mobile-menu-toggle` (`44x44px`) e `.indicator` (`24x24px` mantendo bolinha visual de `10px`), mais anel `:focus-visible` interno para cards/slides com `overflow: hidden`;
  - Correção de responsividade: eliminação de regras conflitantes entre `@media (min-width: 769px) and (max-width: 1199px)` e `@media (max-width: 1199px)`, remoção de `margin-right: 35%` de `.footer-links` no tablet, grade simétrica `grid-auto-flow: row` para os 7 itens de rodapé no mobile, ajuste de `.gallery-img { height: 100%; }`, espaçamento lateral das setas em `.galeria-carousel-wrapper` (`<= 576px`), padding móvel de `.details-modal-content` e ocultação de `.scroll-down` em telas baixas / modo paisagem;
  - Estilização completa de `.skip-link`, `.sr-only`, `.lgpd-contact-note` (texto discreto em bloco contínuo, sem fundo/borda/ícone e com espaçamento normal para link inline), `.details-legal-note`, `.consent-map-box`, `.lightbox-consent-gate`, `#cookie-banner` (barra flutuante enxuta de 1 linha/cartão compacto no desktop e grade horizontal de 3 botões no mobile para não cobrir conteúdo) e `#cookie-modal`, além de blocos `@media (prefers-reduced-motion: reduce)` e `@media (forced-colors: active)`.
- [`js/script.js`](js/script.js):
  - Navegação acessível (`aria-expanded`, `Escape` com retorno de foco, fechamento ao clicar fora);
  - Preservação de `.header-scrolled` em subpáginas sem `#hero`;
  - Carregamento de `packages.json` apenas quando `#details-modal` existe;
  - Eliminação de disparo duplicado entre `.package-card-3d` e `.btn-open-flyer`;
  - Mensagem dinâmica do WhatsApp no modal usando `https://wa.me/5542999162340`;
  - Gate de consentimento para vídeos externos no Lightbox, trap de foco (`Tab` / `Shift+Tab`) compartilhado entre `#lightbox` e `#details-modal`, restauração de foco e `aria-hidden`, correção de tecla `Space` em cards/slides sem rolar a página e respeito a `prefers-reduced-motion` (inclusive fallback visível quando GSAP não estiver ativo).
- [`llms.txt`](llms.txt) e [`llms-full.txt`](llms-full.txt): remoção de alegações não confirmadas (`All-Inclusive`, `quartos climatizados`, `ar-condicionado`, `Pensão Completa`, `sonar Garmin/Lowrance`, `Avaliação Google: 5.0 estrelas`), inclusão do CNPJ `17.227.623/0001-04`, correção de WhatsApp e link para `/refund`.
- [`vercel.json`](vercel.json), [`_redirects`](_redirects), [`sitemap.xml`](sitemap.xml), [`README.md`](README.md): adição de rotas/redirecionamentos `/reembolso`, `/cancelamento`, `/politica-de-reembolso` e `/devolucao` para `/refund`, inclusão de `https://www.eldoradolake.com.br/refund` no sitemap e atualização documental em `README.md`.

---

## 4. Testes Realizados e Resultados (Após Edições Finais)

1. **Validação Sintática JavaScript (`node --check`):**
   - `js/consent.js`: **PASSOU** (exit code `0`)
   - `js/script.js`: **PASSOU** (exit code `0`)
   - `api/markdown.js`: **PASSOU** (exit code `0`)
   - **Simulação Unitária de Consentimento (`test_consent_behavior.js`):** **PASSOU** (`3/3` cenários: oculto sobre `#hero` até rolagem de 50% mantendo trackers/mídias bloqueados, revelação estável após rolagem/deep-link, exibição imediata em subpáginas sem `#hero` e desbloqueio via `acceptAll`).
2. **Script Automatizado de Auditoria Estática (`audit_checks.py`):**
   - **Contraste WCAG 2.2 AA (10 pares críticos medidos):** **TODOS PASSARAM** (`--text-light` `17.99:1`, `--primary-gold` `11.41:1`, `--text-muted` `8.31:1`/`7.92:1`, `#ffffff` sobre `.btn-whatsapp` `#15803d` `5.02:1` / `:hover #166534` `7.13:1`, `#ffffff` sobre `.cta-epic-btn` `#15803d` `5.02:1` a `#0f6b4e` `6.49:1` / `:hover #0c5840` `8.45:1`).
   - **Balanceamento CSS (`css/style.css`):** **PASSOU** (`open=783`, `close=783` chaves sem desbalanceamento).
   - **JSON / XML / JSON-LD (`vercel.json`, `data/packages.json`, `site.webmanifest`, `sitemap.xml` + 6 blocos JSON-LD em HTML):** **TODOS PASSARAM** no parseamento estrito; `packages.json` validado com `<h3>` e `aria-hidden="true"`.
   - **Auditoria HTML em todas as 7 páginas (`index.html`, `about.html`, `contact.html`, `privacy.html`, `terms.html`, `refund.html`, `404.html`):** **TODAS PASSARAM** com `0` imagens sem `alt`, `0` links `target="_blank"` sem `noopener noreferrer`, `0` `iframe src` pré-carregados, `0` scripts de analytics pré-carregados no HTML, `0` referências locais quebradas (imagens, thumbs, `data-full`, CSS, JS, ícones e vídeos), exatamente `1` `<h1>` e `0` saltos de nível (`h1->h2->h3->h4`), CNPJ `17.227.623/0001-04` presente e `#mobile-menu-btn` + `#main-content` presentes em todas.
   - **Cruzamento de IDs JS -> HTML (`js/script.js`):** **PASSOU** — os `34` IDs consultados via `getElementById` existem em `index.html` (ou são injetados em runtime por `js/consent.js`, como `cookie-modal`).
   - **Varredura de WhatsApp antigo (sem o nono dígito `9`):** **PASSOU** (`0` ocorrências restantes no repositório).
3. **Servidor HTTP Local (`python -m http.server 4173 --bind 127.0.0.1`):**
   - Resposta HTTP **200 OK** verificada via cliente Python em `/`, `/about.html`, `/contact.html`, `/privacy.html`, `/terms.html`, `/refund.html`, `/404.html`, `/css/style.css`, `/js/consent.js`, `/js/script.js` e `/data/packages.json`.
   - Servidor local encerrado ao final dos testes.
4. **Testes Interativos e Visuais em Navegador Real (Chrome DevTools MCP):**
   - **BLOQUEADO / PENDENTE NO AMBIENTE:** A conexão do subagente de navegador ao Chrome falhou com `ENOENT: no such file or directory, open 'C:\Users\User\AppData\Local\Google\Chrome\User Data\DevToolsActivePort'` porque o Google Chrome com depuração remota (`chrome://inspect/#remote-debugging`) não estava ativo. Por isso, fluxos visuais ao vivo em Desktop/Tablet/iPhone 13 e capturas de tela permanecem pendentes de validação em browser ativo.

---

## 5. Pendências que Dependem do Proprietário

1. **Dados Empresariais Complementares (Decreto nº 7.962/2013):** Caso queira completar além do CNPJ (`17.227.623/0001-04`) já publicado: informar **Razão Social exata** constante no cartão CNPJ e **endereço físico completo** (logradouro/estrada rural ou ponto de referência formal).
2. **Canal de Encarregado (DPO - LGPD art. 41):** Confirmar se `thiagowiteck@hotmail.com` seguirá como canal oficial do Encarregado/responsável pelo tratamento ou se haverá e-mail institucional dedicado (ex.: `privacidade@...`) e nome/identificação expressa do Encarregado na `privacy.html`.
3. **Link do Facebook no Rodapé e Schema.org:** Por orientação explícita do proprietário, `https://www.facebook.com/wwinformaticapho` foi mantido inalterado no código. Recomenda-se futuramente atualizar para página oficial da Eldorado Lake caso exista, evitando confusão de identidade empresarial ao consumidor.
4. **Direito de Imagem e Menores (LGPD art. 14 e ECA art. 17):** Manter termo escrito de autorização de uso de imagem dos clientes fotografados — em especial para [`gallery_38.webp`](assets/images/gallery_38.webp), em que aparece **criança/menor de idade** — mediante consentimento específico e destacado de pelo menos um dos pais ou responsável legal.
5. **Licenças Comerciais e Uso de Marcas de Terceiros:**
   - Verificar autorização formal das marcas citadas como parceiras (`Tr Fishing`, `Iscas Mathias`, `Titan Caiaques`, `Steelfish`) e da imagem promocional associada ao Mercado Livre (`ml_cart.webp`);
   - Verificar enquadramento de licenciamento do **GSAP / ScrollTrigger** (em versões anteriores à disponibilização gratuita para uso comercial pela Webflow em 2025, sites que comercializam pacotes exigiam licença comercial *Club GSAP* — checar versão exata presente em `js/vendor/gsap.min.js`).
6. **Comprovação Factual de Números e Superlativos:** Guardar lastro documental (ou suavizar copy, caso não haja base objetiva) para afirmações da página principal como *"a maior e mais exclusiva operação"*, *"área preservada 167 km²"*, *"exemplares de até 94 cm"*, e vínculo entre diplomas BGFA exibidos nas fotos (73 cm em caiaque) e descrições comerciais.
7. **Cabeçalho CSP (Content-Security-Policy) em Produção:** `vercel.json` já aplica `HSTS`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` e `Permissions-Policy`. Antes de adicionar `Content-Security-Policy` estrita em produção, recomenda-se refatorar atributos inline `onload="this.media='all'"` / `style="..."` nos HTMLs e validar todos os domínios do `Vercel Web Analytics` e embeds após consentimento em ambiente de staging.

---

## 6. Matriz de Riscos Jurídicos (Requisito 17)

| Gravidade | Tema / Diploma Legal | Descrição do Risco | Status / Ação Recomendada |
| :-: | :--- | :--- | :--- |
| **Alta** | **LGPD art. 14 & ECA — Imagem de Menor** | Foto `gallery_38.webp` exibe menor de idade em contexto publicitário/comercial sem guarda comprovada no repositório de consentimento parental escrito e específico. | Risco jurídico ativo se não houver autorização escrita assinada pelos pais/responsável legal. Recolher/arquivar termo ou remover a foto até regularização. |
| **Média–Alta** | **Publicidade Enganosa (CDC art. 37) & Decreto 7.962/2013** | Superlativos absolutos (`"a maior e mais exclusiva"`) e números (`"167 km²"`, `"até 94 cm"`) sem comprovação pública; ausência opcional de Razão Social e endereço completo ao lado do CNPJ `17.227.623/0001-04`; Facebook apontando para perfil terceiro (`wwinformaticapho`). | Afirmações fáticas falsas em pacote/Schema (`ar-condicionado`, `pensão completa`, `rating 5.0`, WhatsApp sem o `9`) já foram corrigidas. Recomenda-se revisão jurídica final do texto comercial e inclusão eventual da Razão Social. |
| **Média** | **Direitos Autorais e Marcas (Lei 9.610/98 e LPI)** | Uso de nomes de parceiros (`Tr Fishing`, `Iscas Mathias`, `Titan Caiaques`, `Steelfish`), personagem/marca Mercado Livre e biblioteca `js/vendor/gsap.min.js` sem manifestação documental arquivada no projeto. | Solicitar/arquivar autorizações das marcas parceiras e conferir versão/licença de `gsap.min.js`. |
| **Média** | **LGPD — Operação Pós-Coleta (Arts. 18, 41 e 46)** | O site não armazena dados em servidor próprio, mas reservas via WhatsApp e e-mail envolvem coleta de CPF/RG e dados de passageiros posteriormente fora do site. | Definir procedimento interno de guarda segura, exclusão após prazo legal/fiscal e atendimento rápido a pedidos de titulares (e-mail/WhatsApp). |
| **Baixa–Média** | **Acessibilidade LBI (Lei nº 13.146/2015, art. 63) / WCAG 2.2 AA** | Correções técnicas aplicadas no código, mas ainda sem homologação em leitor de tela (NVDA/VoiceOver) e inspeção renderizada no Chrome após bloqueio do DevTools MCP. | Executar inspeção visual em navegador real (Desktop, Tablet e Mobile) ativando `chrome://inspect/#remote-debugging` e teste manual por teclado/leitor de tela. |
| **Baixa** | **Segurança HTTP / Marco Civil** | Ausência de CSP (`Content-Security-Policy`) em `vercel.json`; demais headers (`HSTS`, `nosniff`, `SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy`) já ativos. | Planejar introdução de CSP após remover `onload` inline do FontAwesome em rodada futura. |

