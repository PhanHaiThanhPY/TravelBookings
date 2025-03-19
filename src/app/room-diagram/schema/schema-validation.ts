import * as z from 'zod';

// Schema validation
export const schemaCreateCustomer = z
  .object({
    customer_name: z
      .string()
      .nonempty('Vui lòng nhập tên')
      .min(2, 'Tên đăng nhập phải lớn hơn 2 kí tự')
      .max(50, 'Tên đăng nhập phải tối đa 50 kí tự')
      .regex(
        /^[a-zA-Z0-9_.]+$/,
        'Tên đăng nhập chỉ được chứa chữ cái, số, dấu gạch dưới (_) và dấu chấm (.)'
      )
      .regex(
        /^(?!.*[_.]{2})[a-zA-Z0-9_].*[a-zA-Z0-9_]$/,
        'Tên đăng nhập không được bắt đầu hoặc kết thúc bằng dấu đặc biệt và không có kí tự đặc biệt liên tiếp'
      ),
    customer_email: z
      .string()
      .nonempty('Vui lòng nhập email')
      .email('Email không đúng định dạng')
      .refine((value) => /^[a-zA-Z0-9_.]+@/.test(value), {
        message:
          'Tên đăng nhập chỉ được chứa chữ cái, số, dấu gạch dưới (_) và dấu chấm (.) trước @',
      }),
    customer_phone: z
      .string()
      .nonempty('Vui lòng nhập số điện thoại')
      .min(10, 'Số điện thoại phải lớn hơn 10 kí tự')
      .max(11, 'Số điện thoại phải tối đa 11 kí tự')
      .regex(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số'),

    address: z
      .string()
      .nonempty('Vui lòng nhập địa chỉ')
      .min(10, 'Địa chỉ phải lớn hơn 10 kí tự')
      .max(100, 'Địa chỉ phải tối đa 100 kí tự')
      .nullable(),

    city_id: z
      .string({ required_error: 'City ID là bắt buộc' }) // Bắt buộc nhập
      .nonempty('Vui lòng chọn Tỉnh/Thành phố'),

    district_id: z
      .string({ required_error: 'District ID là bắt buộc' })
      .nonempty('Vui lòng chọn Quận/Huyện'),

    ward_id: z
      .string({ required_error: 'Ward ID là bắt buộc' })
      .nonempty('Vui lòng chọn Phường/Xã'),
  })
  .superRefine((data: any, ctx: any) => {
    if (!data.city_id && data.district_id) {
      ctx.addIssue({
        path: ['district_id'],
        message: 'Bạn phải chọn City ID trước khi chọn District ID',
      });
    }
    if (!data.district_id && data.ward_id) {
      ctx.addIssue({
        path: ['ward_id'],
        message: 'Bạn phải chọn District ID trước khi chọn Ward ID',
      });
    }
  });
