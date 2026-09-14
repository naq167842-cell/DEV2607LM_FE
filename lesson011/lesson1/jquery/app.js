// data: array / json / api
let students = [
    {
        studentId: "SV001",
        studentName: "Nguyễn Văn A",
        age: 20,
        sex: true,
        birthDate: "2002-04-23",
        birthPlace: "HN",
        address: "25, Vũ Ngọc Phan"
    },
    {
        studentId: "SV002",
        studentName: "Nguyễn Văn B",
        age: 21,
        sex: false,
        birthDate: "2001-09-09",
        birthPlace: "ĐN",
        address: "1, Ngô Quyền"
    },
    {
        studentId: "SV003",
        studentName: "Nguyễn Văn C",
        age: 19,
        sex: true,
        birthDate: "2003-07-07",
        birthPlace: "HCM",
        address: "1, Lý Tự Trọng"
    },
    {
        studentId: "SV004",
        studentName: "Nguyễn Văn D",
        age: 21,
        sex: false,
        birthDate: "2005-07-07",
        birthPlace: "HCM",
        address: "1, Lý Tự Trọng"
    }
];


// Hàm hiển thị danh sách sinh viên
const fn_renderStudents = (data) => {

    $(".list table tbody").empty();

    data.forEach((student, index) => {

        let gioiTinh = student.sex ? "Nam" : "Nữ";

        let row = `
            <tr>
                <td>${index + 1}</td>
                <td>${student.studentId}</td>
                <td>${student.studentName}</td>
                <td>${student.age}</td>
                <td>${gioiTinh}</td>
                <td>
                    <button class="btn btn-xem"
                        onclick="fn_showStudent('${student.studentId}')">
                        Xem
                    </button>

                    <button class="btn btn-sua"
                        onclick="fn_editStudent('${student.studentId}')">
                        Sửa
                    </button>

                    <button class="btn btn-xoa"
                        onclick="fn_deleteStudent('${student.studentId}')">
                        Xóa
                    </button>
                </td>
            </tr>
        `;

        // Thêm vào bảng
        $(".list table tbody").append(row);
    });
};


// Hàm xem thông tin sinh viên
const fn_showStudent = (id) => {

    let student = students.find(function (item) {
        return item.studentId === id;
    });

    if (!student) return;

    // Hiển thị thông tin lên form
    $("#studentId").val(student.studentId);
    $("#studentName").val(student.studentName);
    $("#age").val(student.age);
    $("#sex").val(student.sex.toString());
    $("#birthDate").val(student.birthDate);
    $("#birthPlace").val(student.birthPlace);
    $("#address").val(student.address);

    // Không cho sửa mã sinh viên
    $("#studentId").prop("disabled", true);

    // Hiển thị box-right
    $(".box-right").fadeOut().fadeIn(1000);
    $(".box-left").css("width", "60%");

    // Cập nhật nút action
    $("#btnAction")
        .attr("data-val", "0")
        .text("Đóng")
        .css("background", "");
};


// Hàm xử lý khi người dùng click nút sửa
const fn_editStudent = (id) => {

    // Hiển thị thông tin lên form
    fn_showStudent(id);

    // Cập nhật nút action
    $("#btnAction")
        .attr("data-val", "1")
        .text("Cập nhật")
        .css("background", "");
};


// Hàm xử lý cập nhật sinh viên
const fn_updateStudent = (student) => {

    // Tìm vị trí sinh viên cần sửa
    let index = students.findIndex((item) => {
        return item.studentId === student.studentId;
    });

    if (index === -1) return;

    // Cập nhật sinh viên
    students[index] = student;

    // Render lại danh sách
    fn_renderStudents(students);

    alert("Cập nhật sinh viên thành công!");
};


// Hàm reset form
const fn_resetForm = () => {

    $("#studentId").val("");
    $("#studentName").val("");
    $("#age").val(18);
    $("#sex").val("true");
    $("#birthDate").val("");
    $("#birthPlace").val("");
    $("#address").val("");

    // Mở lại ô mã sinh viên
    $("#studentId").prop("disabled", false);

    // Cập nhật nút action
    $("#btnAction")
        .attr("data-val", "2")
        .text("Ghi lại")
        .css("background", "green");
};


// Hàm xử lý thêm mới
const fn_saveStudent = (student) => {

    // Kiểm tra mã sinh viên không được trùng
    let exists = students.some((item) => {
        return item.studentId === student.studentId;
    });

    if (exists) {
        alert("Mã sinh viên " + student.studentId + " đã tồn tại!");
        return;
    }

    // Ghi vào mảng
    students.push(student);

    // Render lại danh sách
    fn_renderStudents(students);

    alert("Thêm sinh viên thành công!");

    // Reset form
    fn_resetForm();
};


// Hàm thực hiện xóa
const fn_deleteStudent = (id) => {

    // Hỏi trước khi xóa
    if (confirm("Bạn có chắc chắn xóa không?") === false) {
        return;
    }

    // Lọc bỏ sinh viên có id cần xóa
    students = students.filter((x) => {
        return x.studentId !== id;
    });

    // Render lại danh sách
    fn_renderStudents(students);
};


// Khi trang web load xong
$(document).ready(() => {

    // Khi click nút thêm mới sinh viên
    $(".btn-add").click(() => {

        $(".box-right").fadeOut().fadeIn(1000);
        $(".box-left").css("width", "60%");

        fn_resetForm();
    });


    // Hiển thị danh sách sinh viên ban đầu
    fn_renderStudents(students);


    // Khi click nút action
    $("#btnAction").click((event) => {

        event.preventDefault();

        // Lấy trạng thái form
        let action = $("#btnAction").attr("data-val");

        console.log("Action:", action);


        // =========================
        // TRẠNG THÁI XEM
        // =========================
        if (action === "0") {

            $(".box-right").fadeOut(1000);
            $(".box-left").css("width", "100%");
        }


        // =========================
        // TRẠNG THÁI CẬP NHẬT
        // =========================
        if (action === "1") {

            // Lấy dữ liệu từ form
            let student = {
                studentId: $("#studentId").val().trim(),
                studentName: $("#studentName").val().trim(),
                age: Number($("#age").val()),
                sex: $("#sex").val() === "true",
                birthDate: $("#birthDate").val(),
                birthPlace: $("#birthPlace").val().trim(),
                address: $("#address").val().trim()
            };

            console.log(student);

            // Cập nhật
            fn_updateStudent(student);
        }


        // =========================
        // TRẠNG THÁI THÊM MỚI
        // =========================
        if (action === "2") {

            // Lấy dữ liệu từ form
            let student = {
                studentId: $("#studentId").val().trim(),
                studentName: $("#studentName").val().trim(),
                age: Number($("#age").val()),
                sex: $("#sex").val() === "true",
                birthDate: $("#birthDate").val(),
                birthPlace: $("#birthPlace").val().trim(),
                address: $("#address").val().trim()
            };

            console.log(student);

            // Kiểm tra mã sinh viên rỗng
            if (student.studentId === "") {
                alert("Vui lòng nhập mã sinh viên!");
                return;
            }

            // Kiểm tra tên sinh viên rỗng
            if (student.studentName === "") {
                alert("Vui lòng nhập tên sinh viên!");
                return;
            }

            // Gọi hàm thêm mới
            fn_saveStudent(student);
        }
    });
});