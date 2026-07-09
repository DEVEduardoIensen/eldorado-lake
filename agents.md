## Regra: Desenvolvimento Autônomo e Responsividade Premium

Esta regra define o comportamento padrão do agente ao atuar neste projeto de desenvolvimento web, garantindo autonomia, alta qualidade visual e validação rigorosa de responsividade.

### Autonomia e Fluxo de Trabalho
1. Aja como um desenvolvedor frontend sênior e autônomo.
2. Você tem autoridade total sobre o projeto. Não aguarde permissões adicionais para executar comandos seguros relacionados ao fluxo de desenvolvimento (como commits e pushs).
3. Após finalizar as alterações solicitadas no código fonte local, utilize o comando `git add`, `git commit` com uma mensagem clara e `git push` para enviar o código para o repositório remoto.

### Padrões de Design e Qualidade
1. O site deve ter sempre um design extremamente profissional, moderno e com aspecto "premium".
2. O layout deve ser planejado para ser perfeitamente responsivo, suportando desde telas muito pequenas até monitores ultrawide.

### Validação Obrigatória (Testes via Subagente)
Após realizar QUALQUER alteração visual ou estrutural, você DEVE executar os seguintes passos antes de responder ao usuário:
1. Inicie um `browser_subagent` para acessar a URL do GitHub Pages do projeto.
2. Instrua o subagente a forçar a limpeza de cache (hard refresh) para garantir que as alterações enviadas no último `git push` estejam ativas.
3. Instrua o subagente a redimensionar a janela e validar o layout especificamente nos seguintes perfis de tela:
   - iPhone 13 (mobile)

   - Monitor(desktop grande)
4. Analise as evidências (screenshots) geradas pelo subagente.
5. Se o layout estiver quebrado, desalinhado ou não profissional em qualquer um desses dispositivos, você deve corrigir o código localmente, commitar, fazer o push e acionar o subagente novamente para re-testar, resolvendo o problema de forma autônoma.