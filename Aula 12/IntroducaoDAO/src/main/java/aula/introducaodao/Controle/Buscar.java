package aula.introducaodao.Controle;

import aula.introducaodao.DAO.ErroDAO;
import aula.introducaodao.DAO.PessoaDAOInterface;
import aula.introducaodao.DAO.PessoaDaoClasse;
import aula.introducaodao.Modelo.Pessoa;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/buscar")
public class Buscar extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/xml");
        response.setCharacterEncoding("UTF-8");
        request.setCharacterEncoding("UTF-8");
        PrintWriter out=response.getWriter();
        try (PessoaDAOInterface dao=new PessoaDaoClasse()){
            List<Pessoa> pessoas=dao.buscar();
            out.println("<pessoas>");
            for (Pessoa p:pessoas)
            {
                out.println("<pessoa>");
                out.println("<id>"+p.getId()+"</id>");
                out.println("<nome>"+p.getNome()+"</nome>");
                out.println("<idade>"+p.getIdade()+"</idade>");
                out.println("</pessoa>");
            }
            out.println("</pessoas>");
        } catch (ErroDAO e) {
            throw new RuntimeException(e);
        }

    }
}
