package com.studentapp.student_api.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.studentapp.student_api.entity.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

}
	


