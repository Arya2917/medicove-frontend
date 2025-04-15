import React, { useState } from "react";
import { Link } from "react-router-dom";

export const navbarData = [
  {
    name: "Home",
    items: null, // No dropdown for Home
  },
  {
    name: "About Us",
    items: ["History", "Management Team", "Vision & Mission", "Accreditations"],
  },
  {
    name: "Centers of Excellence",
    items: [
      "Cardiology",
      "Neurology",
      "Gastroenterology",
      "Orthopedic",
      "Oncology",
      "Gynecology",
      "View All Specialties",
    ],
  },
  {
    name: "Doctors",
    items: null, // No dropdown for Doctors
    link: "/doctors",
  },
  {
    name: "Contact",
    items: null, // No dropdown for Contact
  },
];
