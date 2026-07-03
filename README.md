# LuxeService - Frontend Solicitations

Bem-vindo ao **Frontend Solicitations** do LuxeService! Este projeto foi desenvolvido em Angular 17+ e serve como o portal principal para Clientes Premium e Analistas gerenciarem solicitações de serviços de luxo.

---

## 🚀 Como Testar o Fluxo Completo (Passo a Passo)

Para simular o ciclo de vida completo de uma solicitação, desde a criação da conta até a aprovação pelo técnico, siga o roteiro abaixo.

### Passo 1: O Papel do Administrador (ADMIN)
O Administrador é responsável por configurar o sistema e cadastrar os Técnicos/Analistas. Como o Admin é uma entidade de alto nível, seu cadastro geralmente é feito via banco de dados ou via Swagger.

**Criando um Analista (via Swagger/API):**
1. Acesse o **Swagger UI** do backend (ex: `http://localhost:8081/swagger-ui.html`).
2. Faça Login como Admin na rota `POST /auth/login` com as credenciais padrão do sistema:
   * **Email:** `admin@system.com`
   * **Senha:** `Admin@123`
3. Pegue o *Token* retornado e coloque no cadeado de Autorização (`Authorize`) no topo do Swagger.
4. Vá na rota `POST /api/admin/users` e envie um JSON para criar um Analista:
   ```json
   {
     "name": "Ana Analista",
     "email": "ana@analista.com",
     "password": "Senha@123",
     "role": "ANALYST",
     "coverageStates": ["SP", "RJ", "DF"]
   }
   ```
   *(Anote o ID gerado se precisar gerenciar as coberturas dela depois!)*

---

### Passo 2: O Papel do Cliente (CLIENT)
O Cliente é quem solicita os serviços premium (como instalações, reformas, etc).

**Cadastrando um Cliente (Pelo Frontend):**
1. Acesse a tela inicial do Frontend (ex: `http://localhost:4200` ou a URL da Vercel).
2. Clique na opção **Criar Conta** (Register).
3. Preencha os dados:
   * **Nome:** João Silva
   * **E-mail:** `joao@cliente.com`
   * **Senha:** `Client@123`
4. Após o cadastro e login, você será redirecionado para o **Painel do Cliente**.

**Criando uma Solicitação:**
1. No Painel do Cliente, clique em **"+ Nova Solicitação"**.
2. Preencha o Tipo de Serviço, Título e Descrição.
3. Avance pelas etapas preenchendo Endereço, Prioridade e Data Preferencial.
4. Confirme! O status inicial ficará como **ENVIADO** (`SUBMITTED`), aguardando que a empresa analise.

---

### Passo 3: O Papel do Analista (ANALYST)
O Analista (que você criou no Passo 1) é quem recebe as solicitações e decide se serão aprovadas ou rejeitadas.

**Aprovando uma Solicitação:**
1. Saia da conta do cliente clicando em **"Sair"** no menu lateral.
2. Faça Login como Analista usando as credenciais criadas no Passo 1:
   * **Email:** `ana@analista.com`
   * **Senha:** `Senha@123`
3. Você será redirecionado para o **Painel do Analista**.
4. Lá aparecerão as solicitações com status **ENVIADO** feitas pelos clientes. Ao clicar na solicitação, o status muda automaticamente para **EM ANÁLISE** (`IN_REVIEW`).
5. Analise os detalhes e clique em **Aprovar** ou **Rejeitar**. O cliente verá o status ser atualizado imediatamente no painel dele!

---

## 🛠️ Tecnologias Utilizadas
* **Angular 17+** (Standalone Components, ESBuild)
* **TailwindCSS** (Estilização com Design Premium Dark Mode)
* **TypeScript** e **RxJS**
* **Vercel** (Hospedagem)

## 📦 Comandos Úteis
* Para rodar o servidor local: `ng serve`
* Para rodar a build de produção: `ng build`
* O build gera a pasta `dist/frontend-solicitations/browser`, que deve ser o destino apontado em plataformas de hospedagem como Vercel ou Netlify.
