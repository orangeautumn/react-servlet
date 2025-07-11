package com.example;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;

@WebServlet(name = "ApiServlet", urlPatterns = { "/api" })
public class ApiServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Read the mock employee hierarchy JSON from the webapp directory
        String jsonPath = getServletContext().getRealPath("/employee-hierarchy.json");
        String json = "";
        try {
            json = new String(Files.readAllBytes(Paths.get(jsonPath)));
        } catch (Exception e) {
            json = "{\"error\":\"Failed to read employee hierarchy\"}";
        }
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        out.print(json);
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Example: Forward POST data to a third-party API (not implemented for demo)
        resp.setContentType("application/json");
        resp.getWriter().print("{\"message\":\"POST to third-party API not implemented\"}");
    }
}
