package com.example.project_livraria;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "cadastrar", value = "/cadastrar")
public class Cadastrar extends HttpServlet {


    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/xml");
        response.setCharacterEncoding("utf-8");
        request.setCharacterEncoding("utf-8");
        PrintWriter out = response.getWriter();
        String dados = request.getParameter("dados");
        String caminho = getServletContext().getRealPath("/WEB-INF/livros.xml");

        if (!dados.equals(null)) {
            try {
                File arquivo = new File(caminho);
                LivrosXML livrosDoArquivo = new LivrosXML(arquivo);

                LivrosXML livrosDoParametro = new LivrosXML(dados);
                livrosDoArquivo.inserirNovoLivro(livrosDoParametro);
                livrosDoArquivo.serealizar(caminho);
                out.print("<mensagem>Cadastrado com sucesso</mensagem>");
            } catch (Exception e) {
                response.sendError(500, "<mensagem>" + e + "</mensagem>");
                //out.print("<mensagem>"+e+"</mensagem>");
            }
        }
    }

}