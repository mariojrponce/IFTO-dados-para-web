function ajax(recurso,dados,funcao,metodo)
{
    const xhr=new XMLHttpRequest();
    xhr.onreadystatechange=funcao;
    if(metodo.toLowerCase()==="get") {
        recurso += "?dados=" + dados;
        xhr.open(metodo, recurso);
        xhr.send();
    }else if(metodo.toLowerCase()==="post")
    {
        xhr.open(metodo, recurso);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send("dados="+dados);
    }
}
onload=()=>{

    document.getElementById("btCadastrar").addEventListener("click",(evento)=>{
       evento.preventDefault();
       //pegar os dados do formulario
        const dados=pegarDadosDoFormulario();
        //chamo a funcao ajax e passo os dados como parametro
        ajax("cadastrar",dados,mostraResposta,"post");
    });
    buscaLivros();
    document.getElementById("btAutores").addEventListener("click",(evento)=> {
        adicionarAutores();
    });
}

function adicionarAutores(){
    const inputadd = `<input type="text" class="autor" placeholder="autor">`
    document.getElementById("divAutores").innerHTML += inputadd
}


function pegarDadosDoFormulario(){
    let categoria = document.getElementById("categoria").value;
    let titulo = document.getElementById("titulo").value;
    let autor = document.getElementsByClassName("autor");
    let ano = document.getElementById("ano").value;
    let preco = document.getElementById("preco").value;
    if (categoria.length > 0 && titulo.length > 0 && autor[0].value.length > 0 &&
        ano.length > 0 && preco.length > 0){

        return `<livro categoria="${categoria}">
            <titulo>${titulo}</titulo>
            ${getAutores(autor)}
            <ano>${ano}</ano>
            <preco>${preco}</preco>
        </livro>`;
    }else{
        alert("teste");
    }
    return 0;
}
function getAutores(autores) {
    let stringAutores = "";
    for(let autor of autores){
        if(autor.value.length > 0){
            stringAutores +=`<autor>${autor.value}</autor>`
        }
    }
    return stringAutores;
}
function mostraResposta(){
    if(this.readyState==4)
    {
        const raiz=this.responseXML.documentElement;
        buscaLivros();
        alert(raiz.textContent);
    }
}

function listaAutores(autores) {
    let stringAutores = "<ol>";
    for(let autor of autores){
            stringAutores +=`<li>${autor.textContent}</li>`
    }
    return stringAutores + "</ol>";
}

function buscaLivros(){
    ajax("relatorio","",function (){
        if(this.readyState===4 && this.status==200){
            const raiz=this.responseXML.documentElement;
            const livros=raiz.getElementsByTagName("livro");
            let texto="";
            for(let livro of livros)
            {
                texto+=`<tr>
                        <td>${livro.getElementsByTagName("titulo")[0].textContent}</td>
                        <td>${listaAutores(livro.getElementsByTagName("autor"))}</td>                        
                        <td>${livro.getElementsByTagName("ano")[0].textContent}</td>
                        <td>${livro.getElementsByTagName("preco")[0].textContent}</td>
                        <td>${livro.getAttribute("categoria")}</td>`;
                texto+= `</tr>`;
            }
            document.querySelector("tbody").innerHTML=texto;
        }
    },"get");
}