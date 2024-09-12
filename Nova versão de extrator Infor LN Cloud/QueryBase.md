```sql
-- A query externa está selecionando todos os campos do resultado da subquery interna.
SELECT * 
FROM (
    -- Primeira subquery selecionando várias colunas de diferentes tabelas e aplicando funções de janelas.
    SELECT 
        cnpj,                      -- CNPJ da empresa
        codigoItem,                -- Código do item
        descricao,                 -- Descrição do item (limitada a 160 caracteres)
        siglaUnidade,              -- Unidade do item (normalizada em letras maiúsculas)
        indicacaoOrigem,           -- Indicação da origem do item
        tipoItem,                  -- Tipo do item
        codNCM,                    -- Código NCM do item (limitado a 8 caracteres)
        exTipi,                    -- EX TIPI (código especial de exceção)
        codigoBarras,              -- Código de barras do item
        codProdAnp,                -- Código do produto na ANP (Agência Nacional do Petróleo)
        cest,                      -- Código CEST do item
        processoId,                -- ID do processo associado ao item
        ROW_NUMBER() OVER (ORDER BY processoId, chaveLogica) linha, -- Atribui uma numeração para as linhas com base em processoId e chaveLogica
        chaveLogica                -- Chave lógica para identificar unicamente o item
    FROM (
        -- Segunda subquery que realiza duas consultas com UNION
        SELECT 
            it.compnr cnpj,               -- CNPJ obtido da tabela 'ln_btfit801' com alias 'it'
            TRIM(it.item) codigoItem,     -- Código do item, com espaços removidos
            SUBSTRING(TRIM(it.dsca), 1, 160) descricao, -- Descrição limitada a 160 caracteres
            TRIM(UPPER(it.cuni)) siglaUnidade, -- Unidade em letras maiúsculas e com espaços removidos
            it.sour indicacaoOrigem,      -- Indicação da origem
            it.ittp tipoItem,             -- Tipo do item 
            SUBSTRING(TRIM(it.frat), 1, 8) codNCM, -- Código NCM do item, limitado a 8 caracteres
            CASE
                WHEN LENGTH(it.frat) = 10 THEN SUBSTRING(it.frat, 9, 2) -- Caso o código NCM tenha 10 caracteres, extrai os dois últimos como exTipi
                ELSE NULL
            END exTipi,                   -- ExTipi (exceção de TIPI)
            TRIM(it.gtin) codigoBarras,   -- Código de barras
            SUBSTRING(TRIM(it.anpc), 1, 9) codProdAnp, -- Código ANP do item
            it.cest,                      -- Código CEST do item
            it.prid processoId,           -- Processo relacionado
            REPLACE(CONCAT(it.compnr, it.item), ' ', '') chaveLogica, -- Cria uma chave lógica única concatenando compnr e item, removendo espaços
            RANK() OVER (PARTITION BY compnr, item ORDER BY prid DESC) rank -- Classificação por processo ID, particionado por compnr e item
        FROM ln_btfit801 it
        WHERE (compnr = :empn OR '0' = :empn) -- Filtra pelo número da empresa, ou considera todos se empn for '0'
        AND prid > :proc                     -- Considera apenas processos com prid maior que um valor fornecido

        UNION

        -- Segunda parte do UNION, trabalhando com outra tabela ('ln_btfit807')
        SELECT 
            COALESCE(it.compnr, 'VARCHAR') cnpj,  -- CNPJ, com valor padrão 'VARCHAR' caso seja nulo
            TRIM(it.itsc) codigoItem,            -- Código do item (itsc), com espaços removidos
            SUBSTRING(TRIM(it.dsca), 1, 160) descricao, -- Descrição limitada a 160 caracteres
            TRIM(UPPER(it.cuni)) siglaUnidade,   -- Unidade em letras maiúsculas e com espaços removidos
            '0' indicacaoOrigem,                -- Indicação de origem padrão
            '09' tipoItem,                      -- Tipo de item fixo '09'
            '00000000' codNCM,                  -- Código NCM fixo '00000000'
            NULL exTipi,                        -- ExTipi vazio
            NULL codigoBarras,                  -- Código de barras vazio
            NULL codProdAnp,                    -- Código ANP vazio
            NULL cest,                          -- CEST vazio
            it.prid processoId,                 -- Processo relacionado
            REPLACE(CONCAT(it.compnr, it.itsc), ' ', '') chaveLogica, -- Chave lógica criada com compnr e itsc
            RANK() OVER (PARTITION BY compnr, itsc ORDER BY prid DESC) rank -- Classificação similar por processo ID
        FROM ln_btfit807 it
        WHERE (compnr = :empn OR '0' = :empn)  -- Filtra pelo número da empresa
        AND prid > :proc                       -- Considera apenas processos com prid maior que um valor fornecido
    )
    WHERE rank = 1          -- Filtra apenas o item com o maior 'prid' (o de maior classificação)
    AND :nrodoc             -- Filtro adicional para um documento específico (parâmetro)
    :criterio               -- Outro critério adicional de filtro (parâmetro)
);
