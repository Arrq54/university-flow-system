import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { User, IUser } from "./models/User";
import { Course } from "./models/Course";
import { UserRoles } from "./utils/UserRoles";

const MONGO_URI = "mongodb://localhost:27017/ufs-seeded-db";

const courseIcons = [
    "bar-chart-grouped-fill.svg",
    "briefcase-4-line.svg",
    "calculator-fill.svg",
    "car-line.svg",
    "charging-pile-line.svg",
    "computer-line.svg",
    "cpu-line.svg",
    "formula.svg",
    "heart-line.svg",
    "hospital-line.svg",
    "pulse-ai-line.svg",
    "macbook-line.svg",
];

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

const timeSlots = [
    { start: "08:15", end: "09:45" },
    { start: "10:00", end: "11:30" },
    { start: "11:45", end: "13:15" },
    { start: "13:30", end: "15:00" },
    { start: "15:15", end: "16:45" },
    { start: "17:00", end: "18:30" },
];

const classTypeMap: Record<string, string[]> = {
    "Data Analysis": [
        "Lecture",
        "R Programming Lab",
        "Statistics Seminar",
        "Python Workshop",
        "Data Visualization Lab",
        "Big Data Architecture",
        "Capstone Project",
        "SQL Bootcamp",
    ],
    "Business Management": [
        "Lecture",
        "Case Study",
        "Leadership Seminar",
        "Economics Lab",
        "Strategic Negotiation",
        "Financial Modeling",
        "Corporate Ethics",
        "Marketing Simulation",
    ],
    "Advanced Calculus": [
        "Lecture",
        "Problem Set Session",
        "Tutorial",
        "Mathematical Modeling",
        "Proof Workshop",
        "Vector Analysis Lab",
        "Computational Math",
        "Differential Equations Seminar",
    ],
    "Automotive Engineering": [
        "Lecture",
        "Engine Lab",
        "CAD Design",
        "Materials Science",
        "Aerodynamics Workshop",
        "Vehicle Dynamics Lab",
        "Chassis Design",
        "Hybrid Systems Tech",
    ],
    "Electrical Grids": [
        "Lecture",
        "Circuit Lab",
        "Power Systems Simulation",
        "High Voltage Lab",
        "Renewable Energy Integration",
        "Smart Grid Seminar",
        "Relay Protection Lab",
        "Grid Economics",
    ],
    "Operating Systems": [
        "Lecture",
        "Kernel Lab",
        "C Workshop",
        "Virtualization Lab",
        "File Systems Design",
        "Memory Management Seminar",
        "Concurrency Lab",
        "Shell Scripting",
    ],
    "Embedded Systems": [
        "Lecture",
        "Microcontroller Lab",
        "Assembly Workshop",
        "C++ for Embedded",
        "RTOS Development",
        "FPGA Programming",
        "Hardware-Software Co-design",
        "PCB Design Lab",
    ],
    "Physics of Light": [
        "Lecture",
        "Optics Lab",
        "Quantum Mechanics Seminar",
        "Spectroscopy",
        "Laser Physics Lab",
        "Fiber Optics Workshop",
        "Photonics Simulation",
        "Electromagnetism",
    ],
    "Anatomy 101": [
        "Lecture",
        "Dissection Lab",
        "Skeletal Workshop",
        "Histology Seminar",
        "Physiology Lab",
        "Pathology Review",
        "Medical Imaging Lab",
        "Neuroanatomy Session",
    ],
    "Internal Medicine": [
        "Lecture",
        "Clinical Rotation",
        "Diagnosis Seminar",
        "Pharmacology Lab",
        "Patient Rounds",
        "Cardiology Workshop",
        "Endocrinology Seminar",
        "Emergency Simulation",
    ],
    "Cyber Security": [
        "Lecture",
        "Penetration Testing",
        "Network Security",
        "Cryptography",
        "Digital Forensics Lab",
        "Incident Response",
        "Malware Analysis",
        "Ethical Hacking",
    ],
    "Artificial Intelligence": [
        "Lecture",
        "Neural Networks Lab",
        "Ethics in AI",
        "Machine Learning",
        "Natural Language Processing",
        "Computer Vision Workshop",
        "Reinforcement Learning",
        "Deep Learning Lab",
    ],
};

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        await User.deleteMany({});
        await Course.deleteMany({});

        const hashedPassword = await bcrypt.hash("123", 10);

        await User.create({
            name: "Main Admin",
            email: "admin@ufs.com",
            password: "123",
            role: UserRoles.ADMIN,
            title: "Dean's Office",
        });

        const createdProfs = (await User.insertMany(
            Array.from({ length: 20 }).map(() => {
                const firstName = faker.person.firstName();
                const lastName = faker.person.lastName();
                return {
                    name: firstName + " " + lastName,
                    email: faker.internet.email({ firstName, lastName, provider: "ufs.com" }).toLowerCase(),
                    password: hashedPassword,
                    role: UserRoles.TEACHER,
                    title: faker.helpers.arrayElement(["Dr.", "Prof.", "PhD"]),
                };
            })
        )) as (IUser & { _id: mongoose.Types.ObjectId })[];

        const createdStudents = (await User.insertMany(
            Array.from({ length: 175 }).map(() => {
                const firstName = faker.person.firstName();
                const lastName = faker.person.lastName();
                return {
                    name: firstName + " " + lastName,
                    email: faker.internet.email({ firstName, lastName, provider: "student.ufs.com" }).toLowerCase(),
                    password: hashedPassword,
                    role: UserRoles.STUDENT,
                    title: "",
                };
            })
        )) as (IUser & { _id: mongoose.Types.ObjectId })[];

        const studentSchedules = new Map<string, Set<string>>();
        createdStudents.forEach((s) => studentSchedules.set(s._id.toString(), new Set()));

        const teacherSchedules = new Map<string, Set<string>>();
        createdProfs.forEach((p) => teacherSchedules.set(p._id.toString(), new Set()));

        const courseEntries = faker.helpers.shuffle(Object.entries(classTypeMap)).slice(0, 6);

        for (let i = 0; i < courseEntries.length; i++) {
            const [courseBaseName, classTypes] = courseEntries[i];

            const courseTeachers = faker.helpers.arrayElements(createdProfs, 3);
            const courseTeacherIds = courseTeachers.map((t) => t._id.toString());

            const classes = [];
            const courseTimeSlots: string[] = [];
            const shuffledClassTypes = faker.helpers.shuffle([...classTypes]);

            for (const className of shuffledClassTypes) {
                let day, slot, slotKey;
                let attempts = 0;
                do {
                    day = faker.helpers.arrayElement(weekDays);
                    slot = faker.helpers.arrayElement(timeSlots);
                    slotKey = `${day}-${slot.start}`;
                    attempts++;
                } while (courseTimeSlots.includes(slotKey) && attempts < 50);

                courseTimeSlots.push(slotKey);

                const freeCourseTeachers = courseTeachers.filter(
                    (p) => !teacherSchedules.get(p._id.toString())?.has(slotKey)
                );
                const teacher = faker.helpers.arrayElement(
                    freeCourseTeachers.length > 0 ? freeCourseTeachers : courseTeachers
                );

                teacherSchedules.get(teacher._id.toString())?.add(slotKey);

                classes.push({
                    assignedTeacher: teacher._id,
                    className,
                    weekday: day,
                    startTime: slot.start,
                    endTime: slot.end,
                    grades: [] as any[],
                    finalGrades: [] as any[],
                });
            }

            const eligibleStudents = createdStudents.filter((student) => {
                const schedule = studentSchedules.get(student._id.toString());
                return !courseTimeSlots.some((slot) => schedule?.has(slot));
            });

            const assignedToThisCourse = faker.helpers.arrayElements(
                eligibleStudents,
                Math.min(eligibleStudents.length, 22)
            );
            const assignedIds = assignedToThisCourse.map((s) => s._id.toString());

            assignedToThisCourse.forEach((student) => {
                const schedule = studentSchedules.get(student._id.toString());
                courseTimeSlots.forEach((slot) => schedule?.add(slot));
            });

            classes.forEach((cls) => {
                const generatedGrades = [];
                const generatedFinalGrades = [];

                for (const studentId of assignedIds) {
                    const gradeCount = faker.number.int({ min: 3, max: 4 });
                    for (let g = 0; g < gradeCount; g++) {
                        generatedGrades.push({
                            studentId: studentId,
                            grade: faker.helpers.arrayElement([2, 3, 3.5, 4, 4.5, 5]),
                            description: faker.helpers.arrayElement([
                                "Quiz",
                                "Activity",
                                "Lab Report",
                                "Midterm",
                                "Homework",
                            ]),
                        });
                    }

                    generatedFinalGrades.push({
                        studentId: studentId,
                        grade: faker.helpers.arrayElement([2, 3, 3.5, 4, 4.5, 5]),
                    });
                }

                cls.grades = generatedGrades;
                cls.finalGrades = generatedFinalGrades;
            });

            await Course.create({
                courseName: `${courseBaseName} - Sem ${i % 2 === 0 ? 1 : 2}`,
                courseCode: `${courseBaseName.substring(0, 3).toUpperCase()}-${faker.number.int({
                    min: 100,
                    max: 999,
                })}`,
                icon: courseIcons[i % courseIcons.length],
                assignedTeachers: courseTeacherIds,
                assignedStudents: assignedIds,
                classes,
            });
        }
        console.log("Database seeding completed. Admin credentials: admin@ufs.com / 123");
        process.exit(0);
    } catch (error) {
        process.exit(1);
    }
};

seedDatabase();
