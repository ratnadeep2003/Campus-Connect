import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {

    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [view, setView] = useState('');
    const navigate = useNavigate();
    const [studentForm, setStudentForm] = useState({ name: '', surname: '', email: '', mobile: '' });
    const [courseForm, setCourseForm] = useState({ title: '', description: '', duration: '', fees: '' });

    const [assignCourse, setAssignCourse] = useState({
        studentId: "",
        courseId: ""
    });


    useEffect(() => {//to load student and course data
        fetch('http://localhost:8080/student')
            .then(res => res.json())
            .then(data => setStudents(data.data));
        fetch('http://localhost:8080/course')
            .then(res => res.json())
            .then(data => setCourses(data.data));
    }, []);

    const saveStudent = () => {
        fetch('http://localhost:8080/student', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentForm)
        })
            .then(res => res.json())
            .then(data => {
                setStudents([...students, data.data]); // updates table instantly
                setStudentForm({ name: '', surname: '', email: '', mobile: '' }); // reset form
                window.bootstrap.Modal.getInstance(document.getElementById('addStudentModal')).hide();
            });
    };

    const saveCourse = () => {
        fetch('http://localhost:8080/course', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(courseForm)
        })
            .then(res => res.json())
            .then(data => {
                setCourses([...courses, data.data]);
                setCourseForm({ title: '', description: '', duration: '', fees: '' });
                window.bootstrap.Modal.getInstance(document.getElementById('addCourseModal')).hide();
            });
    };


    function handleCourseAssign(e) {
        setAssignCourse({ ...assignCourse, [e.target.id]: e.target.value })
        console.log(assignCourse);

    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-3 d-flex flex-column" style={{ height: '100vh', position: 'fixed' }}>
                    <header>
                        <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white">
                            <div className="position-sticky">
                                <div className="list-group list-group-flush mx-3 mt-4">
                                    <a href="#" className="list-group-item list-group-item-action py-2 ripple" aria-current="true">
                                        <i className="fas fa-tachometer-alt fa-fw me-3"></i>
                                    </a>
                                    <a href="#" className="list-group-item list-group-item-action py-2 ripple">
                                        <i className="fas fa-chart-area fa-fw me-3"></i>
                                        <button onClick={() => {
                                            const modal = new window.bootstrap.Modal(document.getElementById('addStudentModal'));
                                            modal.show();
                                        }} className="btn btn-primary">Add Student
                                        </button>
                                    </a>
                                    <a href="#" className="list-group-item list-group-item-action py-2 ripple">
                                        <i className="fas fa-lock fa-fw me-3"></i>
                                        <button onClick={() => {
                                            const modal = new window.bootstrap.Modal(document.getElementById('addCourseModal'));
                                            modal.show();
                                        }} className="btn btn-primary">Add Course
                                        </button>
                                    </a>
                                    <a href="#" className="list-group-item list-group-item-action py-2 ripple">
                                        <i className="fas fa-lock fa-fw me-3"></i>
                                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#assignCourse">
                                            Assign Course
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </nav>
                        <nav id="main-navbar" className="navbar navbar-expand-lg bg-white fixed-top">
                            <div className="container-fluid">
                                <button data-mdb-button-init className="navbar-toggler" type="button" data-mdb-collapse-init data-mdb-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                                    <i className="fas fa-bars"></i>
                                </button>
                                <form className="d-none d-md-flex input-group w-auto my-auto">
                                    <input autoComplete="off" type="search" className="form-control rounded" placeholder='Search (ctrl + "/" to focus)' style={{ minWidth: '225px' }} />
                                    <span className="input-group-text border-0"><i className="fas fa-search"></i></span>
                                </form>
                            </div>
                        </nav>

                    </header>
                    <main style={{ marginTop: '58px' }}>
                        <div className="container pt-4"></div>
                    </main>
                    <div className="mt-auto d-flex gap-2 p-3 justify-content-center">
                        <button onClick={() => setView('students')} type="button" className="btn btn-primary">Student</button>
                        <button onClick={() => setView('courses')} type="button" className="btn btn-primary">Course</button>
                        <button className="btn btn-primary">Assign Course</button>
                    </div>
                </div>
                <div className="col-lg-9 text-center" style={{ marginLeft: '25%', marginTop: '58px' }}>
                    {
                        view === 'students' && (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Sr no.</th>
                                        <th>Name</th>
                                        <th>Surname</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        students.map((student, i) => (
                                            <tr key={student._id}>
                                                <td>{i + 1}</td>
                                                <td>{student.name}</td>
                                                <td>{student.surname}</td>
                                                <td>{student.email}</td>
                                                <td>{student.mobile}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
                    }

                    {
                        view === 'courses' && (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Sr no.</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Duration</th>
                                        <th>Fees</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        courses.map((course, i) => (
                                            <tr key={course._id}>
                                                <td>{i + 1}</td>
                                                <td>{course.title}</td>
                                                <td>{course.description}</td>
                                                <td>{course.duration}</td>
                                                <td>{course.fees}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        )
                    }
                </div>
            </div>

            {/* student model */}
            <div className="modal fade" id="addStudentModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Student</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div class="row mb-4">
                                    <div class="col">
                                        <div data-mdb-input-init class="form-outline">
                                            <input type="text" className="form-control" value={studentForm.name} onChange={e => setStudentForm({ ...studentForm, name: e.target.value })} />
                                            <label class="form-label" for="form3Example1">First name</label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div data-mdb-input-init class="form-outline">
                                            <input type="text" className="form-control" value={studentForm.surname} onChange={e => setStudentForm({ ...studentForm, surname: e.target.value })} />
                                            <label class="form-label" for="form3Example2">Last name</label>
                                        </div>
                                    </div>
                                </div>

                                <div data-mdb-input-init class="form-outline mb-4">
                                    <input type="email" className="form-control" value={studentForm.email} onChange={e => setStudentForm({ ...studentForm, email: e.target.value })} />
                                    <label class="form-label" for="form3Example3">Email address</label>
                                </div>
                                <div data-mdb-input-init class="form-outline mb-4">
                                    <input type="text" className="form-control" value={studentForm.mobile} onChange={e => setStudentForm({ ...studentForm, mobile: e.target.value })} />
                                    <label class="form-label" for="form3Example3">Mobile</label>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={saveStudent}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* course model */}
            <div className="modal fade" id="addCourseModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Course</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="modal-body">
                                <form>
                                    <div class="row mb-4">
                                        <div class="col">
                                            <div data-mdb-input-init class="form-outline">
                                                <input type="text" value={courseForm.title} onChange={e => setCourseForm({ ...courseForm, title: e.target.value })} />
                                                <label class="form-label" for="form3Example1">Title</label>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div data-mdb-input-init class="form-outline">
                                                <input type="text" value={courseForm.duration} onChange={e => setCourseForm({ ...courseForm, duration: e.target.value })} />
                                                <label class="form-label" for="form3Example2">Duration</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div data-mdb-input-init class="form-outline mb-4">
                                        <input type="email" value={courseForm.description} onChange={e => setCourseForm({ ...courseForm, description: e.target.value })} />
                                        <label class="form-label" for="form3Example3">Description</label>
                                    </div>
                                    <div data-mdb-input-init class="form-outline mb-4">
                                        <input type="email" value={courseForm.fees} onChange={e => setCourseForm({ ...courseForm, fees: e.target.value })} />
                                        <label class="form-label" for="form3Example3">Fees</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={saveCourse}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Assign Course Modal */}
            <div class="modal fade" id="assignCourse" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <select onChange={handleCourseAssign} name="" id="studentId" className='form-control'>
                                <option value="">Select Option</option>
                                {
                                    students.map((student) => {

                                        return (
                                            <option value={student._id}>{student.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;
