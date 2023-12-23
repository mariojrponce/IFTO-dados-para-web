package aula.javaexmlnoturno;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.w3c.dom.*;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.time.LocalDateTime;

@WebServlet(name = "serealizar", value = "/serealizar")
public class Serealizar extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/xml");

        // Hello
        PrintWriter out = response.getWriter();

        String caminho=getServletContext().getRealPath("/WEB-INF/nota.xml");

            Document doc=FabricaDeDocumento.geraDocumento(caminho);
            Element raiz=(Element) doc.getFirstChild();  //doc.getDocumentElement();

            Node irmao=raiz.getElementsByTagName("cabecalho").item(0);

            Element datahora=doc.createElement("datahora");
            Text noTexto=doc.createTextNode(LocalDateTime.now().toString());
            datahora.appendChild(noTexto);

            raiz.insertBefore(datahora,irmao);


           try {
               StringWriter escritor=new StringWriter();
               TransformerFactory fabrica = TransformerFactory.newInstance();
               Transformer transformador = fabrica.newTransformer();
               DOMSource fonte = new DOMSource(doc);
               StreamResult saida = new StreamResult(escritor);
               transformador.transform(fonte, saida);
               String texto=escritor.toString();
               out.print(texto);
           }catch ( TransformerException e)
           {
               throw new RuntimeException(e);
           }

    }

}