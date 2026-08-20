<div align="center">

# 🎣 Eldorado Lake — Pesca Esportiva ao Dourado

<p align="center">
  <strong>Website oficial de alto padrão para a maior operação de pesca esportiva ao Dourado no Lago Foz do Areia, Paraná.</strong>
</p>

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-success?style=for-the-badge&logo=vercel&logoColor=white)](https://www.eldoradolake.com.br/)
[![Performance](https://img.shields.io/badge/Performance-100%25%20Vanilla-e5c158?style=for-the-badge&logo=speedtest&logoColor=060a13)](https://www.eldoradolake.com.br/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://www.eldoradolake.com.br/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.eldoradolake.com.br/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://www.eldoradolake.com.br/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

[🌐 Acessar Website Oficial](https://www.eldoradolake.com.br/) • [📱 Contato WhatsApp](https://wa.me/554299162340)

---

</div>

## 📌 Sobre o Projeto

O **Eldorado Lake** é uma plataforma institucional e de conversão desenvolvida sob medida para a operação de pesca esportiva guiada pelo especialista Thiago Witeck no imenso Lago Foz do Areia (PR).

O projeto foi concebido sob uma identidade visual **Dark Luxury & Gold**, combinando estética refinada, engenharia de performance em código puro (*zero frameworks pesados*) e foco total em conversão de reservas.

---

## 🌟 Principais Funcionalidades & Diferenciais

### 🎬 Hero Section Dinâmica com Vídeo Responsivo
- Reprodução de vídeo em segundo plano com fontes adaptadas automaticamente para Mobile (`assets/videos/hero_mobile.mp4`) e Desktop (`assets/videos/hero_video.mp4`).
- Camada de sobreposição (*overlay*) e partículas douradas sutis animadas em segundo plano.

### 🖼️ Carrossel & Modal Lightbox com Navegação Completa
- **Carrossel do Rancho:** Exibição da estrutura e acomodações com paginação interativa.
- **Galeria com 42 Fotos:** Carregamento ultra-rápido com miniaturas WebP e carregamento progressivo sob demanda (*Lookahead Buffer*).
- **Lightbox Interativo:** Ao ampliar qualquer foto (Rancho ou Galeria), o modal funciona como carrossel com:
  - Botões circulares em *glassmorphism* com hover dourado.
  - Contador de fotos dinâmico (`ex: 1 / 42`).
  - Navegação por setas do teclado (`←` e `→`) e tecla `ESC`.
  - Suporte completo a gestos de arrastar (*Touch Swipe*) em celulares.
  - Pré-carregamento instantâneo das imagens vizinhas em alta resolução.

### 💰 Gestão Inteligente de Pacotes & Preços
- **Integração com Google Sheets:** Os valores dos pacotes podem ser sincronizados automaticamente via planilha remota usando `PapaParse`.
- **Modais de Detalhes dos Pacotes:** Visualizador com diferenciais, inclusões e regras de hospedagem.
- **CTA Personalizado:** Botão para montagem de pacotes sob medida com mensagem pré-formatada para WhatsApp.

### 📍 Localização & Rota
- Mapa do Google Maps interativo embutido com rota otimizada e botão com link direto para navegação GPS.
- Badge indicativa profissional de recomendação do Google Maps.

### 🛒 Integração com Mercado Livre
- Banner responsivo e botão direto para a Loja Oficial de equipamentos de pesca no Mercado Livre.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Estrutura** | HTML5 Semântico | Hierarquia estruturada com Schema.org JSON-LD (`LodgingBusiness`, `SportsActivityLocation`) |
| **Estilização** | CSS3 Vanilla | Mais de 3.000 linhas de CSS puro, variáveis CSS, Glassmorphism, Flexbox e Grid |
| **Lógica** | JavaScript ES6+ Vanilla | Modular, sem jQuery ou frameworks pesados, 100% nativo |
| **Animações** | GSAP 3.12 + ScrollTrigger | Transições suaves de entrada e efeitos de números contadores |
| **Mídia** | WebP + MP4 | Compressão de imagens com redução de mais de 56% de dados e carregamento assíncrono |
| **SEO & Meta** | OpenGraph, Robots, Sitemap | Otimizado para compartilhamento rico em redes sociais e indexação no Google |

---

## ⚡ Otimização de Performance

- **Thumbnails Dedicadas:** As 42 fotos da galeria utilizam miniaturas leves de ~35 KB na rolagem horizontal e carregam a versão em resolução máxima apenas ao abrir o Lightbox.
- **Buffer de Carregamento Inteligente:** O navegador carrega apenas as 4 fotos visíveis no início e antecipa o carregamento das próximas conforme o carrossel avança.
- **IntersectionObserver:** Enfileiramento em tempo ocioso para garantir transições fluidas sem travamento de thread.
- **`decoding="async"` & `will-change`:** Renderização não bloqueante e aceleração por GPU.

---

## 📂 Estrutura do Repositório

```text
eldorado-lake/
├── assets/
│   ├── images/
│   │   ├── thumbs/          # Miniaturas otimizadas para o carrossel (WebP)
│   │   └── *.webp           # Imagens em alta resolução (Rancho, Galeria, Logos)
│   └── videos/
│       ├── hero_video.mp4   # Vídeo da Hero para Desktop
│       └── hero_mobile.mp4  # Vídeo vertical otimizado para Mobile
├── css/
│   └── style.css            # Folha de estilos completa do projeto
├── js/
│   └── script.js            # Lógica, carrosséis, lightbox e integrações
├── data/
│   └── packages.json        # Dados e descrições dos pacotes de pesca
├── index.html               # Página principal da aplicação
├── robots.txt               # Diretrizes para motores de busca
├── sitemap.xml              # Mapa do site para indexação Google
├── llms.txt                 # Especificação estruturada para agentes de IA
└── README.md                # Documentação oficial
```

---

## 🚀 Como Executar Localmente

Como o projeto é construído em tecnologias nativas da web, não há necessidade de etapas complexas de compilação ou instalação de dependências:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/DEVEduardoIensen/eldorado-lake.git
   ```

2. **Acesse o diretório:**
   ```bash
   cd eldorado-lake
   ```

3. **Abra no navegador:**
   - Basta abrir o arquivo `index.html` diretamente em qualquer navegador moderno.
   - Ou utilize a extensão **Live Server** no VS Code para desenvolvimento com recarregamento automático.

---

## 📞 Contato & Créditos

- **Operação:** Eldorado Lake — Pesca Esportiva ao Dourado
- **Localização:** Lago Foz do Areia, Pinhão - PR, Brasil
- **WhatsApp:** [(42) 9 9916-2340](https://wa.me/554299162340)
- **Desenvolvimento:** [Eduardo Iensen](https://github.com/DEVEduardoIensen)

---

<div align="center">
  <sub>© 2026 Eldorado Lake. Todos os direitos reservados.</sub>
</div>
