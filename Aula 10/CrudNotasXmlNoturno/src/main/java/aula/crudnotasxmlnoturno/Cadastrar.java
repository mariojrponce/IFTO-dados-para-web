package aula.crudnotasxmlnoturno;

import java.io.*;

import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerException;

@WebServlet(name = "cadastrar", value = "/cadastrar")
public class Cadastrar extends HttpServlet {


    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/xml");
        response.setCharacterEncoding("utf-8");
        request.setCharacterEncoding("utf-8");
        PrintWriter out = response.getWriter();
        String dados=request.getParameter("dados");
        String caminho=getServletContext().getRealPath("/WEB-INF/notas.xml");

        try {
            File arquivo=new File(caminho);
            NotaXml notasDoArquivo=new NotaXml(arquivo);
            NotaXml notaDoParametro=new NotaXml(dados);
            notasDoArquivo.inserirNovaNota(notaDoParametro);
            notasDoArquivo.serealizar(caminho);
            out.print("<mensagem>Cadastrado com sucesso</mensagem>");
        } catch (Exception e) {
            response.sendError(500,"<mensagem>"+e+"</mensagem>");
            //out.print("<mensagem>"+e+"</mensagem>");
        }


    }

}