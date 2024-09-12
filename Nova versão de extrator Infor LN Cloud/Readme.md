# Projeto de Renovação de Extração de Dados - ERP Infor LN Cloud

Este projeto tem como objetivo renovar o processo de extração de dados do **ERP Infor LN Cloud** para o **MySQL**, melhorando a análise e o tempo de execução da extração no datalake.

## Objetivos

1. **Facilitar a análise quando faltam registros necessários para JOINs entre as tabelas**.
2. **Melhorar o tempo de execução da extração no datalake**.

## Estrutura do Processo

### 1. Validação de Integridade de Registros

Antes de iniciar a extração, um processo de validação verifica a presença de todos os registros necessários para os JOINs entre as tabelas.

- Se faltarem registros, é gerado um log ou uma tabela temporária com os IDs faltantes para rápida identificação e reprocessamento.
- Uma **Tabela de Controle (CTRL_CARGA_BTFIT)** irá registrar se a carga foi completa ou se houve problemas com registros ausentes.

### 2. Melhorias no Tempo de Execução da Extração

Para otimizar a extração no datalake, as seguintes estratégias são utilizadas:

- **Extração em Lotes**: 
  - O volume de dados por lote é gerenciado pela tabela de controle `CTRL_CARGA_BTFIT`.
  
- **Otimização de Queries**:
  - As queries de extração são revisadas para garantir que os índices adequados estão sendo usados nas colunas de filtragem e JOINs (`compnr`, `prid`, etc.).
  
- **Compressão e Particionamento de Dados**:
  - Compressão e particionamento dos dados por `prid` ou por data de criação para melhorar o desempenho de consultas em grandes volumes.

### 3. Armazenamento Temporário no MySQL

Após a extração, os dados são armazenados temporariamente no MySQL com as seguintes colunas adicionais:

- **ID**: Identificador único.
- **MULTORG_ID**: ID relacionado a múltiplos órgãos ou empresas.
- **NUMERO_DA_LINHA**: Número da linha do registro.
- **PID**: ID do processo (vinculado à lógica do processo).
- **CREATED**: Data e hora de criação do registro (preenchido automaticamente).

#### Controle de Extração

- A tabela `CTRL_CARGA_BTFIT` controla o volume de dados por lote, o último `prid` extraído e o tempo de retenção dos dados.
- A tabela `RELAC_TIPO_OBJ_INTEGR_CARGA_BTFIT` indica quais tipos de integração cada `btfit` deve extrair, organizando o processo de carga.

### 4. Limpeza Automática dos Dados

Um processo de limpeza é agendado para rodar durante a noite e remove registros antigos com base nos parâmetros de retenção definidos em `CTRL_CARGA_BTFIT`.

- Após a limpeza, um procedimento valida se os registros foram corretamente excluídos.
- Logs de auditoria são criados, se necessário, para acompanhar a exclusão de registros.

## Fluxo Geral do Processo

1. **Entrada de Parâmetros**:
   - Os parâmetros de extração são definidos na tabela de controle `CTRL_CARGA_BTFIT`.

2. **Extração dos Dados**:
   - Os dados são extraídos das tabelas do ERP (por exemplo: `ln_btfit801`) e inseridos no MySQL com as colunas adicionais.

3. **Validação de Registros para JOINs**:
   - A integridade dos registros é verificada para garantir que os dados essenciais para os JOINs estão completos.

4. **Carga dos Dados no Compliance**:
   - Após a extração, os dados são processados e inseridos nas tabelas de montagem já existentes para envio ao Compliance.

5. **Manutenção e Limpeza dos Dados**:
   - O processo de limpeza remove registros antigos de acordo com as regras de retenção, garantindo que o volume de dados não cresça excessivamente.


Este projeto está licenciado sob os termos da licença MIT.
