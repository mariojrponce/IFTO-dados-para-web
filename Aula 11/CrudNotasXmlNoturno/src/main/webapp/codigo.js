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
    buscaNotas();
}
function pegarDadosDoFormulario(){
    return `<nota>
            <de>${document.getElementById("de").value}</de>
            <para>${document.getElementById("para").value}</para>
            <cabecalho>${document.getElementById("cabecalho").value}</cabecalho>
            <corpo>${document.getElementById("corpo").value}</corpo>
        </nota>`;
}

function mostraResposta(){
    if(this.readyState==4)
    {
        const raiz=this.responseXML.documentElement;
        buscaNotas();
        alert(raiz.textContent);
    }
}
function buscaNotas(){
    ajax("relatorio","",function (){
        if(this.readyState===4 && this.status==200){
            const raiz=this.responseXML.documentElement;
            const notas=raiz.getElementsByTagName("nota");
            let texto="";
            for(let nota of notas)
            {
                texto+=`<tr>
                        <td>${nota.getElementsByTagName("de")[0].textContent}</td>
                        <td>${nota.getElementsByTagName("para")[0].textContent}</td>
                        <td>${nota.getElementsByTagName("cabecalho")[0].textContent}</td>
                        <td>${nota.getElementsByTagName("corpo")[0].textContent}</td>`;
                if(nota.getElementsByTagName("data").length>0)
                {
                    texto+=`<td>${nota.getElementsByTagName("data")[0].textContent}</td>
                    <td>${nota.getElementsByTagName("hora")[0].textContent}</td>`;
                }else
                {
                    texto+=`<td>-</td><td>-</td>`;
                }
                texto+= `</tr>`;
            }
            document.querySelector("tbody").innerHTML=texto;
        }
    },"get");
}