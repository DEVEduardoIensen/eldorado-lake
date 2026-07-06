# 🎣 Eldorado Lake - Pesca Esportiva ao Dourado

> Um website institucional premium de alta fidelidade desenvolvido para a maior operação de pesca esportiva ao Dourado no Lago Foz do Areia (Pinhão, Paraná).

---

## ✨ Design & Identidade Visual

O projeto foi reformulado seguindo uma proposta visual sofisticada e moderna com a temática **Aquatic Dark & Gold**:
*   **Luxo & Sofisticação**: Fundo ultra-escuro (Deep Black/Navy) combinado com gradientes dourados metálicos e detalhes translúcidos (*Glassmorphism*).
*   **Tipografia Nobre**: Uso das fontes Google Fonts **Outfit** (para títulos marcantes e dinâmicos) e **Inter** (para um corpo de texto limpo e legível).
*   **Micro-animações**: Transições suaves e efeitos dinâmicos de hover em cards, botões e imagens.
*   **Lightbox & Modal de Detalhes**: Modais flutuantes interativos para visualização direta de vídeos e detalhamento dos pacotes em texto estruturado sem carregar imagens estáticas.

---

## 🚀 Funcionalidades

1.  **Apresentação da Operação**: Destaque para a pesca 100% esportiva (prática do pesque e solte) com guias especializados no Lago Foz do Areia.
2.  **Infraestrutura do Rancho**: Cards detalhados sobre as suítes confortáveis, culinária típica regional e deck panorâmico.
3.  **Pacotes de Pesca**: Exibição responsiva e interativa em 3D dos planos de pesca (Premium e Standard) destacando as inclusões e preços diretamente na página.
4.  **Galeria de Ação**: Integração nativa com vídeos do YouTube de Thiago Witeck e Reels do Instagram (Dicas e técnicas).
5.  **Formulário de Contato Inteligente**: Sistema de validação integrado que direciona os dados inseridos diretamente para o WhatsApp de reservas da operação (ocultado em celulares para otimizar os canais de contato direto).

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando tecnologias web puras (*vanilla*) para garantir carregamento ultra-rápido, excelente performance e facilidade de deploy em qualquer servidor (como Hostinger):
*   **HTML5** (Semântico e estruturado para SEO)
*   **CSS3** (Variáveis nativas, Flexbox, Grid e Transições)
*   **JavaScript (ES6+)** (Manipulação de DOM, Lightbox e API de redirecionamento do WhatsApp)
*   **FontAwesome** (Pacote de ícones sociais e utilitários)

---

## 📁 Estrutura do Projeto

```text
eldorado-lake/
├── assets/
│   └── images/          # Assets de imagem (Logo, Banners e Flyers em alta definição)
├── index.html           # Estrutura e semântica principal do site
├── style.css            # Estilização completa e responsiva (Aquatic Dark & Gold)
├── script.js            # Interatividade, Lightbox e lógica do formulário
├── .gitignore           # Exclusão de arquivos de cache e sistema
└── README.md            # Documentação do projeto
```

---

## 🌐 Como Visualizar o Projeto

### Localmente
Clone o repositório e abra o arquivo `index.html` em qualquer navegador:
```bash
git clone https://github.com/DEVEduardoIensen/eldorado-lake.git
cd eldorado-lake
# Se quiser rodar um servidor local rápido com Python:
python -m http.server 8000
```
Acesse `http://localhost:8000` no seu navegador.

### Publicação (Vercel + Hostinger)
O projeto é otimizado para deploy contínuo via Vercel.

**Passo a passo para Hospedagem:**
1. Crie uma conta gratuita em [Vercel.com](https://vercel.com).
2. Clique em **Add New Project** e conecte sua conta do GitHub.
3. Importe o repositório `eldorado-lake`. Nenhuma configuração extra é necessária (Framework Preset: Other).
4. Clique em **Deploy**.

**Configurando o Domínio (Hostinger):**
1. No painel do projeto na Vercel, vá em **Settings > Domains** e adicione seu domínio (ex: `eldoradolake.com.br`).
2. A Vercel fornecerá os registros de DNS (Geralmente um registro `A` apontando para o IP `76.76.21.21` e um registro `CNAME` apontando para `cname.vercel-dns.com`).
3. Abra o painel da **Hostinger**, vá em Gerenciar Domínio > Editor de Zona DNS e adicione/atualize os registros conforme instruído pela Vercel.

---

*Desenvolvido com dedicação para a Eldorado Lake e Thiago Witeck.*
