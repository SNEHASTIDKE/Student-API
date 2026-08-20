package com.studentapp.student_api.entity;
import javax.persistence.*;
import javax.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message="Name is required")
    @Column(nullable = false)
    private String name;
    
    
    @NotNull(message= "Age is required")
    @Min(value=1, message="Age must be at least 1")
    @Max(value=100, message="age must be realistic")
    @Column(nullable = false)
    private Integer age;
    
    
    @NotBlank(message="Email is required")
    @Email(message ="Email must be a valid format")
    @Column(nullable = false, unique = true)
    private String email;
    public String getName() {
        return name;
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

	
	


