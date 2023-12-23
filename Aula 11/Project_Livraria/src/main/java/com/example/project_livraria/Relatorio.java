package com.example.project_livraria;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;

@WebServlet(name = "relatorio", value = "/relatorio")
public class Relatorio extends HttpServlet {


    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/xml");
        response.setCharacterEncoding("utf-8");
        PrintWriter out = response.getWriter();
        String caminho=getServletContext().getRealPath("/WEB-INF/livros.xml");
        try {
            /*File arquivo=new File(caminho);
            NotaXml notasDoArquivo=new NotaXml(arquivo);
            //notasDoArquivo.serealizar(out);
            out.print(notasDoArquivo.serealizar());*/

            byte[] dados=Files.readAllBytes(Paths.get(caminho));
            String dadosXML=new String(dados);
            out.print(dadosXML);
        } catch (Exception e) {
            response.sendError(500,"<mensagem>"+e+"</mensagem>");
            //out.print("<mensagem>"+e+"</mensagem>");
        }
    }
}