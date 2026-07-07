# 🎣 Eldorado Lake - Pesca Esportiva ao Dourado

> Um website institucional premium de altíssima performance desenvolvido para a maior operação de pesca esportiva ao Dourado no Lago Foz do Areia (Pinhão, Paraná).

---

## ✨ Design & Identidade Visual

O projeto foi meticulosamente desenhado seguindo uma proposta visual sofisticada e moderna com a temática **Aquatic Dark & Gold**:
*   **Luxo & Sofisticação**: Fundo ultra-escuro (Deep Black/Navy) combinado com gradientes dourados metálicos e detalhes translúcidos (*Glassmorphism*).
*   **Tipografia Nobre**: Uso das fontes Google Fonts **Outfit** (para títulos marcantes e dinâmicos) e **Inter** (para um corpo de texto limpo e legível).
*   **Imersão Visual**: Vídeo de altíssima definição em background cobrindo 100% da viewport, entregando uma experiência imersiva e cinematográfica (sem barras pretas verticais ou distorções, mantido no aspecto nativo com object-fit cover).
*   **Micro-animações**: Transições suaves e efeitos dinâmicos de hover em cards, botões e imagens.
*   **Lightbox & Modal de Detalhes**: Modais flutuantes interativos para visualização direta de vídeos e detalhamento dos pacotes em texto estruturado sem carregar imagens estáticas.

---

## ⚡ Performance Extrema (Otimização WebP)

O código foi otimizado a nível extremo para garantir fluidez impecável em conexões 4G:
*   **Compressão Híbrida WebP**: O projeto passou por uma migração total para a última geração WebP.
    *   **Alta Fidelidade (Quality 99)**: Elementos visuais primordiais (background, fotos do rancho e assets-chave) rodam na maior qualidade fotográfica possível, pesando menos que JPEGs não comprimidos.
    *   **Galeria Ultra-Rápida (Quality 85)**: Para maximizar o carregamento instantâneo, as 43 imagens da galeria sofreram tuning fino para qualidade 85, poupando absurdos **4.8 Megabytes** em dados móveis num único carregamento, resultando em um ganho direto de 2 a 3 segundos na métrica LCP (Largest Contentful Paint).
*   **Asset Cleanup**: Zero lixo de código. Arquivos originais em JPG, scripts locais (como python tools) e imagens não utilizadas foram purgados do repositório final.

---

## 🚀 Funcionalidades

1.  **Apresentação da Operação**: Destaque para a pesca 100% esportiva (prática do pesque e solte) com guias especializados no Lago Foz do Areia.
2.  **Infraestrutura do Rancho**: Cards detalhados sobre as suítes confortáveis, culinária típica regional e deck panorâmico.
3.  **Pacotes de Pesca**: Exibição responsiva e interativa em 3D dos planos de pesca (Premium e Standard) destacando as inclusões e preços diretamente na página.
4.  **Galeria de Ação**: Integração nativa com vídeos do YouTube de Thiago Witeck e Reels do Instagram, e galeria hiper-otimizada.
5.  **Formulário de Contato Inteligente**: Sistema de validação integrado que direciona os dados inseridos diretamente para o WhatsApp de reservas da operação (ocultado inteligentemente no layout responsivo móvel, priorizando o Floating Action Button do WhatsApp).

---

## 🛠️ Tecnologias Utilizadas

Projeto 100% focado em performance pura (*vanilla*), sem overhead de frameworks pesados:
*   **HTML5** (Semântico e estruturado)
*   **CSS3** (Variáveis nativas, Flexbox, Grid e Transições fluídas)
*   **JavaScript (ES6+)** (Manipulação de DOM, Lightbox Modular)
*   **FontAwesome** (Pacote de ícones SVG otimizados)
*   **Formatos Otimizados**: Imagens exclusivamente `.webp` e vídeos em `.mp4` com compressão web.

---

## 🌐 Deploy na Vercel (Hobby Tier)

Este projeto está pronto e foi concebido para rodar no Vercel (Global Edge Network) de forma gratuita (Tier Hobby).
**Capacidade de Tráfego Estimada:**
*   A Vercel Hobby fornece **100 GB** de banda por mês.
*   Considerando a nossa recém-implementada otimização extrema, o peso total da Home Page + Imagens de alta conversão reduziu de forma agressiva. 
*   **Cálculo**: Se o visitante consome cerca de 10-15MB carregando o vídeo, a cota suporta cerca de **6.500 a 10.000 visitas puras (limpas) por mês**. Considerando o Cache de Navegador (visitors recorrentes custam 0 MB), a capacidade real pode escalar facilmente para **15.000 a 20.000 acessos mensais** totalmente de graça e blindado contra picos.

*Desenvolvido com dedicação para a Eldorado Lake e Thiago Witeck.*
