*** Settings ***
Library           SeleniumLibrary
Library           Dialogs
Suite Setup       Open Browser    ${URL}    ${BROWSER}
Suite Teardown    Close Browser

*** Variables ***
${URL}            http://localhost:5500/index.html  
${BROWSER}        Chrome
${SELECTOR_BOTAO_EXCLUIR}   css=table tr td:nth-child(4) a  # Seletor CSS do botão de excluir
${SELECTOR_BOTAO_ADICIONAR}   id=add  # Seletor do botão de adicionar
${SELECTOR_BOTAO_EDITAR}     css=table tr:last-child td:nth-child(3) a  # Seletor do botão de editar (última linha da tabela)
${SELECTOR_BOTAO_SALVAR}     id=editar  # Seletor do botão de salvar

*** Test Cases ***
Adicionar Cartao
    [Documentation]    Adicionar um cartão à carteira
    Go to               ${URL}
    Input Text          id=card-number     1234 5678 9101 1121
    Input Text          id=name-text        NOAH JACOB
    Input Text          id=valid-thru-text  02/40
    Input Text          id=cvv-text         123
    Click Button        id=add
    Sleep    2s  # Aguarda 2 segundos
    Wait Until Element Is Visible   css=div.modal p.error
    Click Element       css=div.modal button.exit
    

Remover Cartao
    [Documentation]    Remover um cartão da carteira
    Sleep    2s  # Aguarda 2 segundos
    Wait Until Element Is Visible   ${SELECTOR_BOTAO_EXCLUIR}    timeout=15s  
    Click Element       ${SELECTOR_BOTAO_EXCLUIR}
    Element Should Not Be Visible   ${SELECTOR_BOTAO_EXCLUIR}

Adicionar_E_Editar_Cartao
    [Documentation]    Adicionar e editar um cartão na carteira
    Go to               ${URL}
    Input Text          id=card-number     1234 5678 9101 1121
    Input Text          id=name-text        NOAH JACOB
    Input Text          id=valid-thru-text  02/40
    Input Text          id=cvv-text         123
    Click Button        ${SELECTOR_BOTAO_ADICIONAR}
    Sleep    2s  # Aguarda 2 segundos
    Wait Until Element Is Visible   css=div.modal p.error
    Click Element       css=div.modal button.exit
    Sleep    2s  # Aguarda 2 segundos para salvar o cartão

    Click Element       ${SELECTOR_BOTAO_EDITAR}
    Input Text          id=name-text        NEW HOLDER  # Novo nome do titular para edição
    Input Text          id=valid-thru-text  12/23  # Nova validade para edição
    Input Text          id=cvv-text         456  # Novo CVV para edição
    Click Button        ${SELECTOR_BOTAO_SALVAR}
    Sleep    2s  # Aguarda 2 segundos para salvar a edição do cartão
    Wait Until Element Is Visible   css=div.modal p.error
    Click Element       css=div.modal button.exit