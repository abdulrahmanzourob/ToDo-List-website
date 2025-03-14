# ToDo-List-website
### **🎯 توضيح العملية الكاملة خطوة بخطوة لعمل الموقع**  

### **🟢 1️⃣ - تحميل الصفحة واسترجاع البيانات من `localStorage`**
📌 عند تحميل الصفحة، يجب جلب المهام المخزنة سابقًا وعرضها على الشاشة.  
🔹 يتم استدعاء `getDataFromLocalStorage()`، التي:
- **تتحقق من وجود مهام مخزنة في `localStorage`**.
- **تحوّل البيانات من JSON إلى مصفوفة `arrayOfTasks`**.
- **تعرض المهام على الشاشة عبر `addElementsToPageFrom()`**.

🔍 **الكود المسؤول عن ذلك:**
```javascript
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLocalStorage();
```

---

### **🟢 2️⃣ - إضافة مهمة جديدة عند إدخال النص والضغط على الزر**
📌 عندما يكتب المستخدم مهمة جديدة في **حقل الإدخال (`.input`)** ويضغط على زر الإضافة:
- يتم استدعاء `addTaskToArray(input.value)`.
- يتم إنشاء **كائن جديد للمهمة يحتوي على (`id`، `title`، `completed`)**.
- يتم إضافة المهمة إلى **`arrayOfTasks`**.
- يتم تحديث `localStorage` لضمان حفظ المهمة حتى بعد إغلاق الصفحة.
- يتم عرض المهمة الجديدة على الشاشة.

🔍 **الكود المسؤول عن ذلك:**
```javascript
submit.onclick = function() {
  if(input.value != "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};
```

🔍 **إنشاء كائن المهمة وإضافته إلى المصفوفة:**
```javascript
function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false
  };
  arrayOfTasks.push(task);
  addElementsToPageFrom(arrayOfTasks);
  addToLocaltorage(arrayOfTasks);
}
```

---

### **🟢 3️⃣ - عرض المهام على الصفحة**
📌 بعد إضافة المهمة أو تحميلها من `localStorage`، يتم عرضها على الشاشة:
- يتم **حذف جميع المهام من `taskDiv`** لمنع التكرار.
- يتم **تكرار المصفوفة `arrayOfTasks`** لإنشاء عناصر `<div>` لكل مهمة.
- إذا كانت المهمة مكتملة (`completed: true`)، يتم **إضافة كلاس `done`** إليها.
- يتم **إضافة زر الحذف داخل كل مهمة**.

🔍 **الكود المسؤول عن ذلك:**
```javascript
function addElementsToPageFrom(arrayOfTasks) {
  taskDiv.innerHTML = ""; // تفريغ قائمة المهام
  arrayOfTasks.forEach(task => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    
    let span = document.createElement("i");
    span.className = "fa-solid fa-trash del";
    div.appendChild(span);
    
    taskDiv.appendChild(div);
  });
}
```

---

### **🟢 4️⃣ - حذف مهمة عند الضغط على زر الحذف**
📌 عندما يضغط المستخدم على أيقونة الحذف:
- يتم التحقق مما إذا كان العنصر المضغوط يحمل كلاس `"del"`.
- يتم **حذف المهمة من `arrayOfTasks`** عبر `filter()`.
- يتم تحديث `localStorage` لضمان حذفها نهائيًا.
- يتم إزالة العنصر من واجهة المستخدم (`DOM`).

🔍 **الكود المسؤول عن ذلك:**
```javascript
taskDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
});
```

🔍 **دالة حذف المهمة من المصفوفة والتخزين المحلي:**
```javascript
function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addToLocaltorage(arrayOfTasks);
}
```

---

### **🟢 5️⃣ - تحديث حالة المهمة عند الضغط عليها**
📌 عندما يضغط المستخدم على أي **مهمة (`.task`)**، يتم تنفيذ الخطوات التالية:
1. يتم **التحقق مما إذا كان العنصر يحمل الكلاس `"task"`**.
2. يتم **الحصول على `data-id`** الخاص بالمهمة المضغوط عليها.
3. يتم **استدعاء `toggleStatusTaskWith(taskId)`** لعكس حالتها (`completed`).
4. يتم تحديث `localStorage` لضمان حفظ التغييرات.
5. يتم **إضافة أو إزالة كلاس `"done"`** لإظهار التغيير بصريًا.

🔍 **الكود المسؤول عن ذلك:**
```javascript
taskDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});
```

🔍 **دالة عكس حالة المهمة (`completed` ✅❌):**
```javascript
function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed = !arrayOfTasks[i].completed; 
    }
  }
  addToLocaltorage(arrayOfTasks);
}
```

---

### **🟢 6️⃣ - التفاعل مع `localStorage` لتخزين واسترجاع المهام**
📌 يتم استخدام `localStorage` للحفاظ على المهام حتى بعد إعادة تحميل الصفحة:
- **تخزين المهام عند إضافتها أو تحديثها**:
  ```javascript
  function addToLocaltorage(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
  }
  ```
- **استرجاع المهام عند تحميل الصفحة**:
  ```javascript
  function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
      let tasks = JSON.parse(data);
      addElementsToPageFrom(tasks);
    }
  }
  ```

---

### **🎯 كيف يعمل الموقع خطوة بخطوة؟**
1️⃣ **يتم تحميل المهام المخزنة** من `localStorage` عند فتح الصفحة.  
2️⃣ **يمكن للمستخدم إضافة مهمة جديدة** بالضغط على زر الإضافة، مما يقوم بحفظها في `localStorage` وعرضها في الواجهة.  
3️⃣ **عند الضغط على مهمة، يتم تحديث حالتها (`completed`)** في `arrayOfTasks` وفي `localStorage`.  
4️⃣ **عند الضغط على زر الحذف، يتم حذف المهمة نهائيًا** من `arrayOfTasks` ومن `localStorage`.  
5️⃣ **عند إعادة تحميل الصفحة، يتم استرجاع المهام** بنفس حالتها السابقة.  

---

### **✅ المميزات الرئيسية لهذا التطبيق**
🔹 **تخزين دائم للمهام** باستخدام `localStorage`.  
🔹 **تحديث فوري للمظهر** عند التفاعل مع المهام.  
🔹 **إمكانية التفاعل عبر الماوس ولوحة المفاتيح (`Enter`)**.  
🔹 **كود نظيف وسهل الفهم باستخدام `event delegation`**.  

**🎉 بهذا، يعمل التطبيق كقائمة مهام ذكية وبسيطة! 🚀**
