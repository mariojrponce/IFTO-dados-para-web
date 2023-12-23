onload=function(){
    const doc=analisador();
    mostrar(doc);
    document.getElementById("btInserir").onclick=inserir;
    document.getElementById("btAdicionarInputAutor").onclick=adicionarInputAutor
}
function adicionarInputAutor(evento)
{
    const botao=evento.target;
    const pai=botao.parentNode;
    const input = document.createElement("input");
    input.setAttribute("placeholder","Autor");
    //input.setAttribute("class","autor");
    input.classList.add("autor");

    const botaoDeletaInput=document.createElement("input");
    botaoDeletaInput.setAttribute("type","button");
    botaoDeletaInput.setAttribute("value","-");
    botaoDeletaInput.onclick=removeInputAutor
    const div=document.createElement("div");

    div.appendChild(input);
    div.appendChild(botaoDeletaInput);
    pai.insertBefore(div,botao);


}
function removeInputAutor(evento)
{
    const botao=evento.target;
    const div=botao.parentNode;
    div.parentNode.removeChild(div);
}

function inserir(evento)
{
    evento.preventDefault();
    const titulo=document.getElementById("titulo").value;
    const autores=document.querySelectorAll("input.autor")
    const ano=document.getElementById("ano").value;
    const preco=document.getElementById("preco").value;

    const doc=analisador();
    if(buscarPorTitulo(titulo,doc)==null)
        {
        const noLivro=doc.createElement("livro");

        criaElemento("titulo",titulo,noLivro,doc);
        for(let autor of autores)
            criaElemento("autor",autor.value,noLivro,doc);
        criaElemento("ano",ano,noLivro,doc);
        criaElemento("preco",preco,noLivro,doc);

        doc.documentElement.appendChild(noLivro);
        salvar(doc);
        mostrar(doc);
    }
    else
        alert("Já existe um livro com este título")
}

function criaElemento(tag,valor,pai,doc)
{
    const noElemento=doc.createElement(tag);
    const noTexto=doc.createTextNode(valor);
    noElemento.appendChild(noTexto);
    pai.appendChild(noElemento);
}
function mostrar(doc)
{
    const livros=doc.getElementsByTagName("livro");
    
    let texto="";
    /*for(let i=0;i<livros.length;i++)
        texto+= deLivroParaLinha(livros[i]);*/
    
    for(let livro of livros)
        texto+= deLivroParaLinha(livro);
    const corpo=this.document.querySelector("tbody");
    corpo.innerHTML=texto;
}
function analisador()
{
    const parser=new DOMParser();
    if(localStorage.dados==undefined)
        localStorage.dados="<livraria></livraria>";
    return parser.parseFromString(localStorage.dados,"text/xml");
}
function salvar(doc)
{
    const serealizador=new XMLSerializer();
    localStorage.dados=serealizador.serializeToString(doc);
}
function deLivroParaLinha(livro)
{
    //const titulo=livro.getElementsByTagName("titulo")[0].firstChild.nodeValue;
    //const titulo=livro.querySelector("titulo").firstChild.nodeValue;
    const titulo=livro.querySelector("titulo").textContent;
    const autores=livro.getElementsByTagName("autor");
    const ano=livro.querySelector("ano").textContent;
    const preco=livro.querySelector("preco").textContent;

    let lista="<ul>"
    for(const autor of autores)
        lista+=`<li>${autor.textContent}</li>`
    lista+="</ul>"


    return `<tr>
        <td>${titulo}</td>
        <td>${lista}</td>
        <td>${ano}</td>
        <td>${preco}</td>
        <td><input data-titulo="${titulo}" type=button value=Deletar onclick=deletar(event)></td>
        <td><input data-titulo="${titulo}" type=button value=Editar onclick=copiaDadosParaInterface(event)></td>
    </tr>`;
}
function copiaDadosParaInterface(evento)
{
    const botao=evento.target;
    const titulo=botao.getAttribute("data-titulo");

    const botaoInserir=document.getElementById("btInserir");
    botaoInserir.value="Salvar";
    botaoInserir.onclick=editar

}
function editar(evento)
{
    evento.preventDefault();
    const botao=evento.target;
    botao.value="Inserir";
    botao.onclick=inserir;
}
function deletar(evento){
    const doc=analisador();
    const botao=evento.target;
    const titulo=botao.getAttribute("data-titulo");
    const noLivro= buscarPorTitulo(titulo,doc);
    if(noLivro!=null)
    {
        noLivro.parentNode.removeChild(noLivro,doc);
        salvar(doc);
        mostrar(doc);
    }
    else
        alert("Livro não existe");
}
function buscarPorTitulo(pesquisa,doc)
{
    const titulos=doc.getElementsByTagName("titulo");
    for(let titulo of titulos)
    {
        if(titulo.firstChild.nodeValue==pesquisa)
            return titulo.parentNode;
    }
    return null;
}
function removeInputsAutor()
{
    const container=document.querySelector("fieldset");
    const divs=container.getElementsByTagName("div");
    const tam=divs.length;
    for(let i=0;i<tam;i++)
        container.removeChild(divs[0]);

}