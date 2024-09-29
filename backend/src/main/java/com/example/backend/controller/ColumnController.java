package com.example.backend.controller;

import com.example.backend.model.ColumnDTO;
import com.example.backend.service.ColumnService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/columns")
public class ColumnController {

    @Autowired
    private ColumnService columnService;

    @Operation(summary = "Create a new column")
    @PostMapping
    public ResponseEntity<ColumnDTO> create(@RequestBody ColumnDTO columnDTO) {
        ColumnDTO createdColumn = columnService.create(columnDTO);
        return ResponseEntity.ok(createdColumn);
    }

    @Operation(summary = "Get all columns")
    @GetMapping
    public ResponseEntity<List<ColumnDTO>> findAll() {
        List<ColumnDTO> columns = columnService.findAll();
        return ResponseEntity.ok(columns);
    }

    @Operation(summary = "Get column by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ColumnDTO> findById(@PathVariable Long id) {
        ColumnDTO column = columnService.findById(id);
        return ResponseEntity.ok(column);
    }

    @Operation(summary = "Update a column")
    @PutMapping("/{id}")
    public ResponseEntity<ColumnDTO> update(@PathVariable Long id, @RequestBody ColumnDTO columnDTO) {
        ColumnDTO updatedColumn = columnService.update(id, columnDTO);
        return ResponseEntity.ok(updatedColumn);
    }

    @Operation(summary = "Soft delete a column")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        columnService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
