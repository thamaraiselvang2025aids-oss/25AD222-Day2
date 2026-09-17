package com.example.leave.service;

import com.example.leave.entity.LeaveRequest;
import com.example.leave.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveService {

    @Autowired
    private LeaveRepository repository;

    // Apply Leave
    public LeaveRequest applyLeave(LeaveRequest leaveRequest) {
        return repository.save(leaveRequest);
    }

    // Get All Leave Requests
    public List<LeaveRequest> getAllLeaves() {
        return repository.findAll();
    }

    // Get Leave By ID
    public LeaveRequest getLeaveById(Long id) {
        return repository.findById(id).orElse(null);
    }

    // Update Leave Status
    public LeaveRequest updateLeaveStatus(Long id, String status) {

        LeaveRequest leave = repository.findById(id).orElse(null);

        if (leave != null) {
            leave.setStatus(status);
            return repository.save(leave);
        }

        return null;
    }

    // Delete Leave
    public void deleteLeave(Long id) {
        repository.deleteById(id);
    }
    public List<LeaveRequest> getLeavesByEmployee(Long employeeId) {
        return repository.findByEmployeeId(employeeId);
    }
}