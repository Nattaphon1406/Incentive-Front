# PMRP Client
### Production & Material Requirement Planning 
# ระบบบริหารจัดการวางแผนผลิต

# Convention Web UI
## Common Convention
- โค้ดการทำงานหนึ่งบรรทัด ใส่ Semi-colon `;`
```
console.log(this.test);
```

## Function And Parameter Naming Conventions
- ส่วนที่เกี่ยวข้องกับ UI จะใช้รูปแบบการตั้งชื่อแบบ **camelCase ขึ้นต้นต้วยตัวพิมพ์เล็ก**
- ส่วนที่เป็นการคำนวน จะใช้รูปแบบการตั้งชื่อแบบ **snake_case ตั้งชื่อตัวแปรโดยมี _(Underscore) เป็นตัวคั่นคำ ตัวพิมพ์เล็กทั้งหมด**
```
func Homepage() //UI 
func calculate_total_price() //logic
```

## HTML Element ID 
- จะใช้รูปแบบการตั้งชื่อแบบ **snake_case ตั้งชื่อตัวแปรโดยมี _(Underscore) เป็นตัวคั่นคำ ตัวพิมพ์เล็กทั้งหมด**
```
receiver_name
total_amount
```

## Directory Name
- ใช้ตัวอักษรพิมพ์เล็กทั้งหมด เช่น 
```
order
productPice **camelCase ขึ้นต้นต้วยตัวพิมพ์เล็ก**
```

## File Name
- ใช้รูปแบบการตั้งชื่อฟังก์ชั่นแบบ **camelCase ขึ้นต้นต้วยตัวพิมพ์ใหญ่**
```
Order.js
OrderReprot.js
Shipping.test.js
```

## Test Name
- ใช้รูปแบบการตั้งชื่อให้สื่อความหมาย  เช่น
```
describe('calculate_total_price', () => {
test('Input 5+8 should be 13',()=>{
        const expected = 13;
        const productPriceList = ["5","8"];
        const actual = CalculateTotalPrice(productPriceList);
        expect(actual).toEqual(expected);
    });
}
```

## Variable Name
- ชื่อตัวแปรเป็นคำเดียวให้ตั้งชื่อเป็นพิมพ์เล็กทั้งหมด เช่น
```
day, month, year
```

- ชื่อตัวแปรมีความยาวตั้งแต่ 2 คำขึ้นไป ให้คำหลังขึ้นตันด้วยตัวอักษรตัวใหญ่เสมอ ในรูปแบบ **camelCase** เช่น
```
start_day, end_month
```

- ชื่อตัวแปรเก็บค่าให้เติม "List" ต่อท้ายตัวแปรเสมอ เช่น
```
order // เม้าส์
order_list //[เม้าส์ ,คีย์บอร์ด]
```

- ชื่อตัวแปร Constant(คงที่) ให้ตังชื่อเป็นตัวอักษรพิมพ์ใหญ่ทั้งหมด เช่น
```
HOUR, MINUTE
```

---

# Convention Web Service
## Function And Parameter Naming Conventions
- ใช้รูปแบบการตั้งชื่อฟังก์ชั่นแบบ **snake_case ตั้งชื่อตัวแปรโดยมี _(Underscore) เป็นตัวคั่นคำ ตัวพิมพ์เล็กทั้งหมด**
```
func calculate_total_price()
```

## Directory Name (Folder)
- ใช้ตัวอักษรพิมพ์เล็กทั้งหมด เช่น
```
order
product
```

## File Name
- camelCase ขึ้นต้นด้วยตัวใหญ่ เช่น
```
OrderService.js
ProductRepository.js
OrderServiceTest.js
```

## Service Name
- ใช้ตัวอักษรพิมพ์เล็กทั้งหมด เช่น
```
order
product
```

## Test Function Name
- ใช้รูปแบบการตั้งชื่อฟังก์ชันเป็นแบบ **snake_case** เช่น
```
test_calculate_age_input_birth_date_18042003_should_be_16
```

## Variable Name
- ชื่อตัวแปรเป็นคำเดียวให้ตั้งชื่อเป็นพิมพ์เล็กทั้งหมด เช่น
```
day, month, year
```

- ชื่อตัวแปรมีความยาวตั้งแต่ 2 คำขึ้นไป ให้คำหลังขึ้นตันด้วยตัวอักษรตัวใหญ่เสมอ ในรูปแบบ **snake_case** เช่น
```
start_day, end_month
```

- ชื่อตัวแปรเก็บค่าให้เติม "list" ต่อท้ายตัวแปรเสมอ เช่น
```
order // เม้าส์
order_list //[เม้าส์ ,คีย์บอร์ด]
```

- ชื่อตัวแปร Constant(คงที่) ให้ตังชื่อเป็นตัวอักษรพิมพ์ใหญ่ทั้งหมด เช่น
```
HOUR, MINUTE
```

----


## ข้อตกลง Commit Message ร่วมกัน
```
[Created]: สร้างไฟล์ใหม่สำหรับ...
[Edited]: แก้ไข code ในไฟล์เดิมที่มีอยู่แล้ว รวมถึงกรณี refactor code
[Added]: กรณีเพิ่ม function, function test ใหม่เข้ามา
[Deleted]: ลบไฟล์ออก 'ชื่อไฟล์' เนื่องจาก...
* ให้เขียนรายละเอียดด้วยว่าแก้ไขอะไรและทำที่ตรงไหน
```

## How to run Acceptance test (API and UI)
### API test


### UI test

