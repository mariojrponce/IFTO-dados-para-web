package aula.jsoncomjava;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/inserir")
public class Inserir extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String textJson=request.getParameter("dadosJson");
        textJson="{\"nome\":\"Tadeu\",\"idade\":70,\"telefones\":[\"3232-4455\",\"9999-8877\"]}";
        //Jsonb jsonb= JsonbBuilder.create();
        //Pessoa p=jsonb.fromJson(textJson,Pessoa.class);
        Pessoa p=ManipuladorJson.JsonParaPessoa(textJson);
        response.getWriter().println(p);
    }
}
