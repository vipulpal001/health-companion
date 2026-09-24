package com.healthcompanion.dto;

public class HealthProfileDTO {
    private String name;
    private Integer age;
    private String gender;
    private String height;
    private String weight;
    private String bloodGroup;
    private String allergies;
    private String conditions;
    private String medications;
    private String emergencyContact;

    public HealthProfileDTO() {}

    public HealthProfileDTO(String name, Integer age, String gender, String height, String weight,
                            String bloodGroup, String allergies, String conditions, String medications,
                            String emergencyContact) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.bloodGroup = bloodGroup;
        this.allergies = allergies;
        this.conditions = conditions;
        this.medications = medications;
        this.emergencyContact = emergencyContact;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public String getHeight() { return height; }
    public void setHeight(String height) { this.height = height; }
    public String getWeight() { return weight; }
    public void setWeight(String weight) { this.weight = weight; }
    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }
    public String getAllergies() { return allergies; }
    public void setAllergies(String allergies) { this.allergies = allergies; }
    public String getConditions() { return conditions; }
    public void setConditions(String conditions) { this.conditions = conditions; }
    public String getMedications() { return medications; }
    public void setMedications(String medications) { this.medications = medications; }
    public String getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }
}
