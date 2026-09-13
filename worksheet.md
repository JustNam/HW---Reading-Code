# Code Reading: Research Plan Editor

## 1. Data Shape
Before diving into state, sketch what one item of `researchQuestion` looks like:
- `researchQuestion` is an array of `_object_`
- Each item has fields: `_questionContent, interviewQs__`

## 2. State Variables

### `title`
- Purpose: 
`lưu/update giá trị của Plan title`
- Where is it read (used in JSX)? 
`đọc value ={title}`
- Where is it written (which handler updates it)? 
`Khi edit text field có lable "Plan title" -> handleTitleChange sẽ gọi setTitle(e.target.value) để cập nhật lại state của Title`

### `researchQuestion`
- Purpose: 
`researchQuestion lưu tên Research Question, cùng với list Interview Question thuộc về Research Questino đó`
- Where is it read (used in JSX)?
`{researchQuestion.map((q,qIndex))}` => ... ()
`value {q.questionContent}`
- Where is it written (which handlers update it)? 
`01.handleAddQuesstion`

`02.handleDeletteQuesstion`

`03.handleEditResearchQ`

`04.handleAddInterviewQ`

`05.handleDeletteInterviewQ`

- Why is it nested (an array of objects, one of which contains another array)? What does that let this UI do?
`Rearch plan bao gồm nhiều researchQuestion, và trong mỗi researchQuestion lại có nhiều interviewQs`

## 3. Handlers

For each handler: what triggers it, what it does, and what it returns/sets.

### `handleTitleChange(e)`
- Parameters:
  - `e`: `e.target.value`

*AI assistant is allowed, please write your answer manually*

- Triggered by: `khi change value text field Plan title`
- What it does: `set state Title = e.target.value`

### `handleAddQuestion()`
- Parameters: (none)
- Triggered by: 
`Khi click vào button "ADD"`
- What it does:
`đọc state researchQuestion hiện tại, tạo 1 object newQuestion = {questionContent: "", interviewQs: []};`
`sau đó lấy toàn bộ Research question cũ + thêm 1 Research question mới vào cuối list`
`setResearchQuestion(newList) -> researchQuestion = newList`

- Why `[...researchQuestion, newQuestion]` instead of `researchQuestion.push(newQuestion)`? 
`[...researchQuestion, newQuestion] sẽ set lại state của newList còn researchQuestion.push(newQuestion) sẽ không set lại state của newList -> JavaScript không nhận ra state newList được cập nhật`

*AI assistant is allowed, please write your answer manually*

### `handleDeleteQuestion(index)`
- Parameters:
  - `index`: `vị trí index của research question trong research question map`
- Triggered by: `click on icon button delete`
- What it does:
`Đọc researchQuestion -> filter () -> loại Researh question có index cần xóa -> setRearchQuestion(newList) -> researchQuestion = newList`
- What does `.filter((q, qIndex) => qIndex !== index)` actually remove?
`loại bỏ research question có q index cần xóa`

*AI assistant is allowed, please write your answer manually*

### `handleEditResearchQ(index, newValue)`
- Parameters:
  - `index`: `vị trí index của research question cần edit trong research question map`
  - `newValue`: `giá trị mới mà user nhập vào Research question field value ={q.questionContent}`
- Triggered by: `Khi edit text field researquestion`
- What it does:
`Đọc Research question -> đọc map Research question -> tìm đúng Research question -> update q : {...q, questionContent: newValue}`
`setResearchQuestion=(newList) -> researchQuestion = newList`
- Walk through what `.map((q, qIndex) => qIndex !== index ? q : {...q, questionContent: newValue})` does for one non-matching item and one matching item.
`Đọc researh question -> đọc research question map`
`Nếu qIndex khác index -> giữ nguyên q`
`Nếu qIndex giống index -> tạo object {...q, questionContent: newValue}`
`setResearchQuestion(newList) -> researchQuestion = newList`


*AI assistant is allowed, please write your answer manually*

### `handleAddInterviewQ(qIndex)`
- Parameters:
  - `qIndex`: `vị trí (index) của research question trong research question map`
- Triggered by: `Khi click button icon Add `
- What it does: 
`Đọc research question -> đọc research question map -> tìm đúng researh question có vị trí (index) = qIndex -> Thêm 1 interview question rỗng "" vào interviewQs`
`setResearchQuestion(newList)`

- What is being spread here: `{...i, interviewQs: [...i.interviewQs, ""]}`? Two different things get copied — what are they?
`{...i} : copy properties của Research question`
`[...i.interviewQs,""] = tạo array Interview question mới và thêm 1 Interview question rỗng "" vào cuối list`


*AI assistant is allowed, please write your answer manually*

### `handleEditInterviewQ(qIndex, subIndex, newValue)`
- Parameters:
  - `qIndex`: vị trí (indext) Research question
  - `subIndex`: vị trí (subIndex) Interview question
  - `newValue`: e.target.value
- Triggered by: `edit Interview question field`
- What it does (this one nests two `.map`s — describe the outer loop, then the inner loop):
`Đọc research question -> đọc map Rearch question tìm đúng research question i !== qIndex`
`-> Đọc Interview question map tìm interview question j !== SubIndex`
`-> Thay gái trị cũ bằng = newValue`

*AI assistant is allowed, please write your answer manually*

### `handleDeleteInterviewQ(qIndex, subIndex)`
- Parameters:
  - `qIndex`: `vị trí (index) của research question`
  - `subIndex`: `vị trí (index) của interview question`
- Triggered by: `Click on icon button delete bên cạnh Interview quesion field`
- What it does:
`Đọc research question -> đọc map Researh question tìm research question -> kiểm tra i !== qIndex`
`Nếu i !== qIndex -> giữ nguyên Reseacrh question`
`Nếu i = qIndex -> filter () interviewQs -> giữ lại các interviewQs có j !== subIndex`

`setResearchQuestion=(newList) -> researchQuestion = newList`
- How is this similar to/different from `handleDeleteQuestion`?
`Delete Research question -> sẽ xóa cả Research question và Interview question của Research question đó`
`Còn delete Interview question chỉ xóa interview question có subIndex đó thôi, còn không xóa Research question`

