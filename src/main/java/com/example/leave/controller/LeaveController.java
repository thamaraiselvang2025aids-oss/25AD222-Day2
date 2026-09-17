package com.example.leave.controller;

import com.example.leave.entity.LeaveRequest;
import com.example.leave.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/leaves")
public class LeaveController {

    @Autowired
    private LeaveService service;

    // Apply Leave
    @PostMapping
    public LeaveRequest applyLeave(@RequestBody LeaveRequest leaveRequest) {
        return service.applyLeave(leaveRequest);
    }

    // Get All Leaves
    @GetMapping
    public List<LeaveRequest> getAllLeaves() {
        return service.getAllLeaves();
    }

    // Get Leave By ID
    @GetMapping("/{id}")
    public LeaveRequest getLeaveById(@PathVariable Long id) {
        return service.getLeaveById(id);
    }

    // Update Leave Status
    @PutMapping("/{id}/status")
    public LeaveRequest updateLeaveStatus(
            @PathVariable Long id,
            @RequestBody LeaveRequest leaveRequest) {

        return service.updateLeaveStatus(id, leaveRequest.getStatus());
    }

    // Delete Leave
    @DeleteMapping("/{id}")
    public String deleteLeave(@PathVariable Long id) {
        service.deleteLeave(id);
        return "Leave deleted successfully";
    }
}