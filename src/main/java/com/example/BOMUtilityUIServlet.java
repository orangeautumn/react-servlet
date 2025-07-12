package com.example;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@WebServlet(name = "BOMUtilityUIServlet", urlPatterns = { "/bomutility", "/bomutility/*" })
public class BOMUtilityUIServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String indexPath = getServletContext().getRealPath("/index.html");
        resp.setContentType("text/html");
        try {
            String html = new String(Files.readAllBytes(Paths.get(indexPath)));
            resp.getWriter().write(html);
        } catch (Exception e) {
            resp.sendError(HttpServletResponse.SC_NOT_FOUND, "bomutility/index.html not found");
        }
    }
}
