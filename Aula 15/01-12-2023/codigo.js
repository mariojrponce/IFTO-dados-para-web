onload=function(){
    document.getElementById("btAdicionarInputAutor").onclick=adicionarInputAutor
    document.getElementById("btInserir").onclick=inserir;
    mostrar();
}
function pegaLivriaria()
{
    if(localStorage.livraria==undefined)
        this.localStorage.livraria="[]";
    return JSON.parse(localStorage.livraria);
}
function salvar(livraria)
{
    localStorage.livraria=JSON.stringify(livraria);
}
function pegaLivroDaInterface()
{
    const inputs=document.querySelectorAll(".autor");
    const autores=[];
    for(let input of inputs)
        autores.push(input.value);

    return {
        titulo:document.getElementById("titulo").value,
        autor:autores,
        ano:document.getElementById("ano").value,
        preco:document.getElementById("preco").value
    };
}
function inserir(evento){
    evento.preventDefault();
    //pegar dados da interface
    const livro=pegaLivroDaInterface();
    //pegar a livraria
    const livraria=pegaLivriaria();
    //inserir o livro na livraria
    livraria.push(livro);
    //salvar a livraria
    salvar(livraria);
    mostrar();
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
//    botaoDeletaInput.onclick=removeInputAutor
    const div=document.createElement("div");

    div.appendChild(input);
    div.appendChild(botaoDeletaInput);
    pai.insertBefore(div,botao);

}
function mostrar()
{
    const livraria=pegaLivriaria();
    let texto="";
    for(let livro of livraria)
        texto+=deLivroParaLinha(livro)
    document.querySelector("tbody").innerHTML=texto;
    ligaFuncaoDeletarNosBotoes();
}
// {
//     titulo:"asdfa",
//     auto:["asdfaf","adsfafsa"],
//     ano:"1234",
//     preco:"asdfaf"
// }
function deLivroParaLinha(livro)
{
    return `<tr>
        <td>${livro.titulo}</td>
        <td><ul> ${livro.autor.map(a => "<li>"+a+"</li>").join("")} </ul></td>
        <td>${livro.ano}</td>
        <td>${livro.preco}</td>
        <td><input data-titulo="${livro.titulo}" type=button value=Deletar></td>
        <td><input data-titulo="${livro.titulo}" type=button value=Editar></td>
    </tr>`;
}
function deletar(evento)
{
    const titulo=evento.target.getAttribute("data-titulo");
    //pega a livriaria
    const livraria=pegaLivriaria();
    console.log(livraria)
    //busca pelo titulo
    const indice=pegaIndiceDoLivro(titulo,livraria);
    console.log(indice);
    //deleta o objeto(livro) encontrado
    if(indice>=0)
        //delete livraria[indice];
        livraria.splice(indice,1);
    //salva no localstorage
    console.log(livraria)
    salvar(livraria);
    mostrar();
}
function pegaIndiceDoLivro(titulo,livraria)
{
    for(let i in livraria)
    {
        const livro=livraria[i];
        if(livro.titulo===titulo)
            return i;
    }
    return -1;
}
function ligaFuncaoDeletarNosBotoes(){
    const botoes=document.querySelectorAll("input[value=Deletar]");
    for(let botao of botoes)
        //botao.onclick=deletar;
        botao.addEventListener("click",deletar);
}