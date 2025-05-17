import Swal from "sweetalert2";

export  const deleteConfirmation = async (id,apiDelete) => {
            try {
              const result = await Swal.fire({
                title: 'هل أنت متأكد؟',
                text: "لن تتمكن من استرجاع هذا العنصر!",
                icon: 'warning',
                showCancelButton: true,  // عرض زر إلغاء
                confirmButtonText: 'نعم، احذف',
                cancelButtonText: 'لا، إلغاء',
                reverseButtons: true  // تغيير ترتيب الأزرار ليكون الـ "نعم" بعد "لا"
              });
              if (result.isConfirmed) {
                //   setSelectedBrandId(id)
                // إذا وافق المستخدم على الحذف
                await apiDelete(id);  // استدعاء دالة الحذف التي تريدها
                // Swal.fire('تم الحذف!', 'تم حذف العنصر بنجاح', 'success');  // عرض رسالة النجاح بعد الحذف
              } else {
                // إذا تم إلغاء الحذف
                Swal.fire('تم الإلغاء', 'لم يتم حذف العنصر', 'info');
              }
            } catch (error) {
              // في حال حدوث خطأ أثناء الحذف
              Swal.fire('خطأ!', 'حدث خطأ أثناء الحذف. يرجى المحاولة مرة أخرى', 'error');
            }
          };