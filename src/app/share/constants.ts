export const Constants = {

  role: {
    role_coach_id : 2,
    role_trainee_id: 3
  },
  error: {
    create_team: {
      name: 'Bạn phải nhập tên cho lớp',
      age: 'Bạn phải nhập độ tuổi',
      numberal: 'Bạn phải nhập số lượng tài khoản'
    },
    profile: {
      first_name: 'Bạn phải nhập tên',
      last_name: 'Bạn phải nhập họ và tên đệm',
      email: 'Bạn phải nhập đúng định dạng email',
      phone: 'Bạn phải nhập số điện thoại',
      height: 'Bạn phải nhập chiều cao',
      weight: 'Bạn phải nhập cân nặng'
    },
    edit_team: {
      name: 'Bạn phải nhập tên cho lớp',
      age: 'Bạn phải nhập độ tuổi',
    },
    create_lesson_plan: {
      name: 'Bạn phải nhập tên giáo án'
    }
  },
  message: {
    manage_team: {
      have_not_team: 'Không có nhóm nào cả!'
    },
    manage_exercise: {
      have_not_exercise: 'Hiện chưa có bài tập!'
    },
    manage_swimStyle: {
      have_not_swimStyle: 'Hiện chưa có kiểu bơi nào cả!'
    },
    profile: {
      verify: 'Tài khoản này đã được chứng thực'
    },
    manage_member: {
      have_not_member: 'Hiện tại chưa có nhóm nào cả'
    },
    manage_record: {
      have_not_schedule: 'Hiện chưa có lịch cho ngày này'
    },
    add_member: {
      have_not_member: 'Không có dữ liệu'
    }
  },
  box: {
    profile: {
      title: 'Xác nhận',
      message: 'Bạn có muốn cập nhât thông tin ?',
      confirm: true
    },
    create_team: {
      title: 'Xác nhận',
      message: 'Bạn có muốn tạo nhóm mới ?',
      confirm: true
    },
    delete_team: {
      title: 'Xác nhận',
      message: 'Bạn có muốn xóa nhóm này ?',
      confirm: true
    },
    edit_team: {
      title: 'Xác nhận',
      message: 'Bạn có muốn cập nhật thông tin mới cho nhóm này?',
      confirm: true
    },
    create_exericise: {
      title: 'Xác nhận',
      message: 'Bạn có muốn tạo bài tập mới ?',
      confirm: true
    },
    create_schedule: {
      title: 'Xác nhận',
      message: 'Bạn có muốn tạo lịch mới ?',
      confirm: true
    },
    create_swimStyle: {
      title: 'Xác nhận',
      message: 'Bạn có muốn thêm kiểu bơi mới ?',
      confirm: true
    },
    delete_swimStyle: {
      title: 'Xác nhận',
      message: 'Bạn có muốn xóa kiểu bơi này ?',
      confirm: true
    },
    create_distance: {
      title: 'Xác nhận',
      message: 'Bạn có muốn thêm khoảng cách mới ?',
      confirm: true
    },
    delete_distance: {
      title: 'Xác nhận',
      message: 'Bạn có muốn xóa khoảng cách này ?',
      confirm: true
    },
    remove_member: {
      title: 'Xác nhận',
      message: 'Bạn có muốn xóa thành viên này ra khỏi nhóm ?',
      confirm: true
    },
    add_record: {
      title: 'Xác nhận',
      message: 'Bạn có muốn thêm dữ liệu này ?',
      confirm: true
    },
    add_member: {
      title: 'Xác nhận',
      message: 'Bạn có muốn thêm thành viên này ?',
      confirm: true
    },
    create_lesson_exercise: {
      title: 'Xác nhận',
      message: 'Bạn có muốn tạo giáo án mới ?',
      confirm: true
    },
    update_lesson_exercise: {
      title: 'Xác nhận',
      message: 'Bạn có muốn chỉnh sửa giáo án này ?',
      confirm: true
    },
  },
  snackBar: {
    edit_team: {
      success: 'Lưu thành công!',
      fail: 'Lỗi! không thể lưu',
      title: 'Đóng'
    },
    remove_member: {
      success: 'Xóa thành công!',
      fail: 'Lỗi! không thể xóa',
      title: 'Đóng'
    },
    add_member: {
      success: 'Thêm thành viên thành công!',
      fail: 'Lỗi! không thể thêm',
      title: 'Đóng'
    },
    add_lesson_plan: {
      success: 'Thêm giáo án thành công!',
      fail: 'Lỗi! không thể thêm',
      title: 'Đóng'
    }
  },
  default: {
    member: {
      phone: 'Chưa có',
      address: 'Chưa có',
      height: 'Chưa có',
      weight: 'Chưa có',
      avatar: 'https://ucarecdn.com/3c918300-f523-4559-a7f7-af095d7ddce7/people.png'
    },
  }
};
