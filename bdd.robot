*** Settings ***
Library           SeleniumLibrary
Library           Dialogs
Suite Setup       Open Browser    ${URL}    ${BROWSER}
Suite Teardown    Close Browser

*** Variables ***
${URL}            http://localhost:5500/index.html  
${BROWSER}        Chrome
${ID_DO_ELEMENTO_DO_CARTAO}     "/html/body/table/tr/td[3]/a"
${ID_DO_ELEMENTO_DO_BOTAO_DE_EXCLUIR}       "/html/body/table/tr/td[4]/a"
${ALERT MESSAGE}

*** Test Cases ***
Adicionar Cartao
    [Documentation]    Adicionar um cartão à carteira
    Go to               ${URL}
    Input Text          id=card-number     1234 5678 9101 1121
    Input Text          id=name-text        NOAH JACOB
    Input Text          id=valid-thru-text  02/40
    Input Text          id=cvv-text         123
    Click Button        id=add
    Sleep    2s  # Aguarda 2 segundos (você pode ajustar o tempo conforme necessário)
    Alert Should Be Present     Cartão adicionado com sucesso!  
    Handle Alert    accept

Remover Cartao
    [Documentation]    Remover um cartão da carteira
    Go to               ${URL}
    Sleep    15s  # Aguarda 2 segundos (você pode ajustar o tempo conforme necessário)
    Element Should Be Visible   xpath=${ID_DO_ELEMENTO_DO_CARTAO}
    Click Element       xpath=${ID_DO_ELEMENTO_DO_BOTAO_DE_EXCLUIR}
    Sleep    2s  # Aguarda 2 segundos (você pode ajustar o tempo conforme necessário)
    Element Should Not Be Visible   xpath=${ID_DO_ELEMENTO_DO_CARTAO}
