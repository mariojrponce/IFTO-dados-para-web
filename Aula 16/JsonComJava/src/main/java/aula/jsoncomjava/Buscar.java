package aula.jsoncomjava;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/buscar")
public class Buscar extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out=response.getWriter();
        Pessoa p=new Pessoa();
        p.setNome("Tadeu");
        p.setIdade(70);
        p.getTelefones().add("3232-4455");
        p.getTelefones().add("9999-8877");
        //Jsonb jsonb= JsonbBuilder.create();
        //response.getWriter().println(jsonb.toJson(p));

        out.println(ManipuladorJson.PessoaParaJson(p));

    }
}
