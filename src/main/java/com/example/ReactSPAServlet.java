package com.example;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@WebServlet(name = "ReactSPAServlet", urlPatterns = { "/employeereports", "/employeereports/*" })
public class ReactSPAServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String indexPath = getServletContext().getRealPath("/index.html");
        resp.setContentType("text/html");
        try {
            String html = new String(Files.readAllBytes(Paths.get(indexPath)));
            resp.getWriter().write(html);
        } catch (Exception e) {
            resp.sendError(HttpServletResponse.SC_NOT_FOUND, "index.html not found");
        }
    }
}
