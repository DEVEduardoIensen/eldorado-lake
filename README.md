# Eldorado Lake — Pesca Esportiva ao Dourado

Plataforma oficial da operação de pesca esportiva ao Dourado no Lago Foz do Areia (Represa Bento Munhoz da Rocha Netto), em Pinhão - Paraná.

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-success?style=for-the-badge&logo=vercel&logoColor=white)](https://www.eldoradolake.com.br/)
[![Performance](https://img.shields.io/badge/Performance-100%25%20Vanilla-e5c158?style=for-the-badge&logo=speedtest&logoColor=060a13)](https://www.eldoradolake.com.br/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://www.eldoradolake.com.br/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.eldoradolake.com.br/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://www.eldoradolake.com.br/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

Website oficial: [https://www.eldoradolake.com.br/](https://www.eldoradolake.com.br/)

---

## Visão Geral

O projeto **Eldorado Lake** é uma aplicação web institucional e de conversão desenvolvida em Vanilla Web Technologies (HTML5, CSS3 e JavaScript moderno). O sistema foi projetado sob a estética *Dark Luxury & Gold*, priorizando tempo de resposta instantâneo, fidelidade visual, acessibilidade e conformidade total com as diretrizes de indexação do Google e agentes de inteligência artificial.

---

## Estrutura de Páginas

* **index.html**: Página principal com hero video responsivo, apresentação da operação, galeria com carrossel dinâmico, acomodações do Rancho Eldorado, tabela de pacotes integrada e seção de contato.
* **about.html**: Apresentação institucional da operação, histórico, embarcações e compromisso com o Pesque e Solte.
* **contact.html**: Canais de atendimento (WhatsApp e e-mail), orientações de acesso rodoviário/aéreo e mapa interativo.
* **privacy.html**: Política de privacidade e tratamento de dados em conformidade com a LGPD (Lei nº 13.709/2018).
* **terms.html**: Termos de serviço, regulamento de reservas, normas de segurança náutica e política de cancelamento.
* **404.html**: Página de erro personalizada com navegação direta para as seções principais.

---

## Recursos e Engenharia

### Performance e Otimização de Recursos
* **Carregamento não-bloqueante:** Estilos e ícones FontAwesome carregados via preload assíncrono.
* **Mídia Otimizada:** Imagens em formato WebP com miniaturas dedicadas (`assets/images/thumbs/`) para a galeria e carregamento progressivo sob demanda.
* **Hero Responsivo:** Vídeo adaptado automaticamente para visualização móvel (`hero_mobile.mp4`) e desktop (`hero_video.mp4`) com poster de fallback em WebP.
* **Partículas Reativas:** Sistema de partículas adaptado dinamicamente para manter estabilidade de 60fps em dispositivos móveis e desktops.

### Favicon Suite e Padrões Google
Favicons gerados em conformidade com as especificações do Google Search e navegadores modernos:
* `favicon.ico` (multi-size: 16x16, 32x32, 48x48)
* `assets/icons/favicon-48x48.png` (resolução base para snippets do Google)
* `assets/icons/favicon-32x32.png` e `favicon-16x16.png`
* `assets/icons/apple-touch-icon.png` (180x180)
* `assets/icons/android-chrome-192x192.png` e `android-chrome-512x512.png`
* `site.webmanifest`

### SEO e Compatibilidade com Agentes de IA
* **Schema.org JSON-LD:** Marcações estruturadas para `Organization`, `SportsActivityLocation`, `LodgingBusiness`, `ContactPage` e `AboutPage`.
* **Sitemap e Robots:** `sitemap.xml` e `robots.txt` configurados para indexação completa.
* **Arquivos para LLMs:** `llms.txt`, `llms-full.txt` e `agents.md` com suporte a negociação de conteúdo via `api/markdown.js`.

---

## Estrutura do Repositório

```text
eldorado-lake/
├── 404.html                 # Página de erro 404
├── about.html               # Página Sobre Nós
├── contact.html             # Página de Contato e Localização
├── index.html               # Página principal
├── privacy.html             # Política de Privacidade (LGPD)
├── terms.html               # Termos de Uso e Regulamento
├── site.webmanifest         # Manifesto PWA
├── robots.txt               # Diretrizes para crawlers
├── sitemap.xml              # Mapa do site XML
├── llms.txt                 # Especificação concisa para IAs
├── llms-full.txt            # Especificação completa para IAs
├── agents.md                # Diretrizes operacionais para agentes
├── vercel.json              # Configurações de cache, redirecionamentos e segurança
├── api/
│   └── markdown.js          # Serverless function para Accept: text/markdown
├── assets/
│   ├── icons/               # Favicons em múltiplas resoluções
│   ├── images/
│   │   ├── thumbs/          # Miniaturas da galeria
│   │   └── *.webp           # Imagens em alta resolução
│   └── videos/              # Vídeos da hero section
├── css/
│   └── style.css            # Folha de estilos completa
├── data/
│   └── packages.json        # Estrutura de dados dos pacotes
└── js/
    └── script.js            # Lógica, animações GSAP, lightbox e integrações
```

---

## Execução Local

Para visualizar e testar o projeto localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/DEVEduardoIensen/eldorado-lake.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd eldorado-lake
   ```

3. Abra o arquivo `index.html` diretamente em seu navegador ou utilize uma extensão de servidor local (ex: Live Server no VS Code).

---

## Contato

* **Operação:** Eldorado Lake — Rancho Eldorado
* **Localização:** Faxinal do Céu, Pinhão - PR, Brasil
* **WhatsApp:** [+55 (42) 99916-2340](https://wa.me/554299162340)
* **E-mail:** [thiagowiteck@hotmail.com](mailto:thiagowiteck@hotmail.com)
* **Desenvolvedor:** [Eduardo Iensen](https://github.com/DEVEduardoIensen)

---

<sub>© 2026 Eldorado Lake. Todos os direitos reservados.</sub>
