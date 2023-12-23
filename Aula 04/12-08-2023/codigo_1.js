onload=()=>{
    const doc=analisador();
    mostrar(doc);
    document.getElementById("btInserir").onclick=inserir;
    document.getElementById("btAdicionaInputParaAutor").onclick=adicionarInputParaAutor;
}
function adicionarInputParaAutor(evento)
{
    const botao=evento.target;
    const div=document.createElement("div");
    const input=document.createElement("input");
    input.setAttribute("placeholder","Autor");
    input.classList.add("autor");
    const pai=botao.parentNode;
    div.appendChild(input);

    const botaoDeleta=document.createElement("input");
    botaoDeleta.setAttribute("type","button");
    botaoDeleta.setAttribute("value","-");
    div.appendChild(botaoDeleta);
    pai.insertBefore(div,botao);
    botaoDeleta.onclick=function(){
        const pai=this.parentNode;
        pai.parentNode.removeChild(pai);
    }

}
function inserir(evento)
{
    evento.preventDefault();
    const doc=analisador();
    const titulo=document.getElementById("titulo").value;
    const autores=document.querySelectorAll("input.autor")
    const ano=document.getElementById("ano").value;
    const preco=document.getElementById("preco").value;

    if(buscarPorTitulo(titulo,doc)==null)
    {

        const noLivro=doc.createElement("livro");
        criaElemento("titulo",titulo,noLivro,doc);
        for(let autor of autores)
            criaElemento("autor",autor.value,noLivro,doc);
        criaElemento("ano",ano,noLivro,doc);
        criaElemento("preco",preco,noLivro,doc);
        doc.documentElement.appendChild(noLivro)
        salvar(doc);
        mostrar(doc)
    }
    else
    alert("Já existe um livro com este título na livraria");
}
function salvar(doc)
{
    const serealizador=new XMLSerializer();
    localStorage.dados=serealizador.serializeToString(doc);
}
function criaElemento(tag,valor,pai,doc)
{
    const noElemento=doc.createElement(tag);
    const noTexto=doc.createTextNode(valor);
    noElemento.appendChild(noTexto);
    pai.appendChild(noElemento);
}
function analisador(){
    const parser=new DOMParser();
    if(localStorage.dados==undefined)
        localStorage.dados="<livraria></livraria>";
    return parser.parseFromString(localStorage.dados,"text/xml");
}
function mostrar(doc){
    const livros=doc.getElementsByTagName("livro");
    let texto="";
    /*for(let i=0;i<livros.length;i++)
        texto+=geraLinha(livros[i])*/
    for(let livro of livros)
        texto+=geraLinha(livro);

    document.querySelector("tbody").innerHTML=texto;
}
function geraLinha(livro)
{
    const titulo=livro.getElementsByTagName("titulo")[0].firstChild.nodeValue;
    const autores=livro.getElementsByTagName("autor");
    const ano=livro.getElementsByTagName("ano")[0].firstChild.nodeValue;
    const preco=livro.getElementsByTagName("preco")[0].firstChild.nodeValue;
   
    let lista="<ul>"
    for(let autor of autores)
        lista+=`<li>${autor.firstChild.nodeValue}</li>`
    lista+="</ul>"


    let texto= `<tr>
        <td>${titulo}</td>
        <td>${lista}</td>
        <td>${ano}</td>
        <td>${preco}</td>
        <td><input data-titulo='${titulo}' type=button value=Deletar onclick=deletar(event)></td>
        <td><input data-titulo='${titulo}' type=button value=Editar onclick=mandaProFormulario(event)></td>
    </tr>`;
    return texto;
}
function mandaProFormulario(evento) //Falta terminar
{
    limpaAutores();
    const botao=document.getElementById("btInserir");
    botao.setAttribute("value","Salvar");
    botao.onclick=editar;
}
function editar() //falta terminar
{
    const botao=document.getElementById("btInserir");
    botao.setAttribute("value","Inserir");
    botao.onclick=inserir;
}
function deletar(evento)
{
    const botao=evento.target;
    const titulo=botao.getAttribute("data-titulo")
    const doc=analisador();
    const livro=buscarPorTitulo(titulo,doc)
    if(livro!=null)
    {
        doc.documentElement.removeChild(livro);
        salvar(doc);
        mostrar(doc);
    }
    else{
        alert("Esse livro não existe");
    }

}
function buscarPorTitulo(pesquisa,doc)
{
    const titulos=doc.getElementsByTagName("titulo");
    for(let titulo of titulos)
    {
        if(titulo.firstChild.nodeValue==pesquisa)
            return titulo.parentNode; //retorna o livro
    }
    return null;
}
function limpaAutores()
{
    const container= document.getElementById("autores");
    const divs=container.getElementsByTagName("div");
    const tam=divs.length;
    for(let i=0;i<tam;i++)
        container.removeChild(divs[0]);

}