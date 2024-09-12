## Ideias para Melhorar a Query

Aqui estão algumas sugestões de otimização e boas práticas para melhorar o desempenho da query:

### 1. Uso de Índices
   - **Verifique se as colunas principais estão indexadas**: As colunas usadas nos filtros e nas junções (`compnr`, `prid`, `item`, `itsc`) devem estar indexadas para otimizar a leitura dos dados. Índices adequados podem reduzir significativamente o tempo de execução da query.
     - **Exemplo**: Verifique se as colunas `compnr`, `prid`, `item` e `itsc` possuem índices, já que são usadas tanto em `WHERE` quanto em `JOIN` e `RANK()`.

### 2. Melhoria no Filtro de Registros
   - **Aplicação antecipada de filtros**: Em vez de aplicar o filtro `rank = 1` na parte mais externa da query, mova-o para as subqueries internas. Isso reduzirá a quantidade de dados processados nas fases subsequentes.
     - **Como fazer**: Aplique `rank = 1` diretamente nas subqueries, logo após o `RANK()`, para que menos dados sejam processados na query principal.

### 3. UNION vs UNION ALL
   - **Verifique a necessidade de usar `UNION`**: Se não há necessidade de remover duplicatas entre as subqueries, use `UNION ALL` em vez de `UNION`. O `UNION` faz uma verificação extra para garantir que não há duplicatas, o que pode ser desnecessário e custoso.
     - **Melhoria**: Se não há duplicação entre as subqueries ou se a duplicação não é um problema, substitua por `UNION ALL` para melhorar o desempenho.

### 4. Uso de Funções de Janela (Window Functions)
   - As funções de janela como `RANK()` e `ROW_NUMBER()` são ótimas para classificar e ordenar dados, mas podem ser custosas em grandes volumes de dados. Verifique se você realmente precisa de ambas as funções (`ROW_NUMBER()` e `RANK()`), ou se uma delas pode ser removida para economizar processamento.

### 5. Colunas Calculadas e Funções
   - **Normalização dos dados**: Se possível, normalize previamente colunas que utilizam `TRIM()`, `UPPER()` e `SUBSTRING()`. Essas funções são processadas em tempo de execução e podem afetar o desempenho, especialmente em grandes volumes de dados. Se os dados forem gravados já formatados, isso melhora a performance.
   - **Exemplo de melhoria**: Em vez de aplicar `TRIM()` e `UPPER()` na coluna `it.cuni`, considere armazenar esses valores já formatados no banco de dados.

### 6. Otimização do Plano de Execução (Execution Plan)
   - Use o **plano de execução** da query para entender onde o banco de dados está gastando mais tempo. Se houver um gargalo em alguma parte da query (como um `FULL SCAN` de tabela), identifique e ajuste essa parte. Ferramentas como MySQL Workbench ou Oracle SQL Developer permitem visualizar os detalhes do plano de execução.

### 7. Dividir em Partições
   - Se as tabelas `ln_btfit801` e `ln_btfit807` forem muito grandes, considere particioná-las por colunas como `prid` ou períodos de tempo. Isso pode melhorar o desempenho de leitura e escrita, especialmente em sistemas que lidam com grandes volumes de dados históricos.

### 8. Uso de Tabelas Temporárias
   - Se a mesma query for executada várias vezes ou se o processo de extração for feito em etapas, considere o uso de **tabelas temporárias** para armazenar resultados intermediários. Isso pode melhorar o desempenho e simplificar o processo de extração.

## Resumo das Sugestões

1. **Use índices nas colunas chave** como `compnr`, `prid`, `item` e `itsc`.
2. **Aplique os filtros o mais cedo possível** para reduzir o volume de dados processados.
3. **Substitua `UNION` por `UNION ALL`** se não precisar remover duplicatas.
4. **Verifique a necessidade das funções de janela** (`RANK()` e `ROW_NUMBER()`) e elimine redundâncias.
5. **Normalize os dados** no momento da gravação para evitar o uso excessivo de funções como `TRIM()` e `UPPER()`.
6. **Utilize o plano de execução** para identificar gargalos e ajustar a query.
7. **Considere particionar as tabelas** para otimizar o processamento de grandes volumes de dados.
8. **Tabelas temporárias** podem ser úteis para armazenar resultados intermediários e melhorar o desempenho de consultas subsequentes.
