const questionBank = {
  "python-basics": [
    { id: 1, question: "What is the output of print(2**3)?", options: ["6", "8", "9", "5"], correct: "B", explanation: "** is power operator, 2^3 = 8" },
    { id: 2, question: "Which keyword defines a function in Python?", options: ["func", "def", "function", "define"], correct: "B", explanation: "def keyword is used to define functions" },
    { id: 3, question: "What data type is [1,2,3] in Python?", options: ["tuple", "dict", "list", "array"], correct: "C", explanation: "Square brackets create a list" },
    { id: 4, question: "How do you take user input in Python?", options: ["scan()", "input()", "read()", "get()"], correct: "B", explanation: "input() function reads user input" },
    { id: 5, question: "What does len('hello') return?", options: ["4", "5", "6", "error"], correct: "B", explanation: "len() counts characters, 'hello' has 5" },
    { id: 6, question: "Which operator is used for integer division?", options: ["/", "%", "//", "**"], correct: "C", explanation: "// performs floor/integer division" },
    { id: 7, question: "What is a correct syntax to output 'Hello' in Python?", options: ["echo('Hello')", "print('Hello')", "console.log('Hello')", "printf('Hello')"], correct: "B", explanation: "print() is Python's output function" },
    { id: 8, question: "How do you start a comment in Python?", options: ["//", "/*", "#", "--"], correct: "C", explanation: "# is used for single line comments" },
    { id: 9, question: "What is the output of bool(0)?", options: ["True", "False", "0", "Error"], correct: "B", explanation: "0 is falsy in Python" },
    { id: 10, question: "Which method adds item to end of list?", options: ["add()", "insert()", "append()", "push()"], correct: "C", explanation: "append() adds element to end of list" }
  ],
  "data-structures": [
    { id: 1, question: "Which data structure uses LIFO principle?", options: ["Queue", "Stack", "Array", "Tree"], correct: "B", explanation: "Stack follows Last In First Out" },
    { id: 2, question: "Which data structure uses FIFO principle?", options: ["Stack", "Tree", "Queue", "Graph"], correct: "C", explanation: "Queue follows First In First Out" },
    { id: 3, question: "Time complexity of binary search is?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], correct: "C", explanation: "Binary search divides array in half each time" },
    { id: 4, question: "Which sorting algorithm is fastest on average?", options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"], correct: "B", explanation: "Quick Sort has O(n log n) average complexity" },
    { id: 5, question: "What is a linked list node made of?", options: ["Only data", "Only pointer", "Data and pointer", "Key and value"], correct: "C", explanation: "Each node has data and a pointer to next node" },
    { id: 6, question: "Which traversal visits root first?", options: ["Inorder", "Postorder", "Preorder", "Level order"], correct: "C", explanation: "Preorder: Root → Left → Right" },
    { id: 7, question: "Hash table average search time is?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correct: "D", explanation: "Hash tables provide constant time lookup" },
    { id: 8, question: "What is the maximum nodes at level 2 of binary tree?", options: ["2", "4", "8", "1"], correct: "B", explanation: "At level 2: 2² = 4 maximum nodes" },
    { id: 9, question: "Which data structure is used for BFS?", options: ["Stack", "Queue", "Array", "Tree"], correct: "B", explanation: "BFS uses Queue to explore level by level" },
    { id: 10, question: "Array elements are stored in?", options: ["Random memory", "Contiguous memory", "Linked memory", "Virtual memory"], correct: "B", explanation: "Arrays use contiguous/sequential memory" }
  ],
  "web-development": [
    { id: 1, question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correct: "A", explanation: "HTML = HyperText Markup Language" },
    { id: 2, question: "Which CSS property changes text color?", options: ["font-color", "text-color", "color", "foreground"], correct: "C", explanation: "color property sets text color in CSS" },
    { id: 3, question: "What does JS stand for?", options: ["Java System", "JavaScript", "Junior Script", "Java Source"], correct: "B", explanation: "JS is abbreviation for JavaScript" },
    { id: 4, question: "Which tag creates a hyperlink in HTML?", options: ["<link>", "<href>", "<a>", "<url>"], correct: "C", explanation: "<a> anchor tag creates hyperlinks" },
    { id: 5, question: "What is the correct CSS to make text bold?", options: ["font-weight: bold", "text-style: bold", "font: bold", "text-weight: bold"], correct: "A", explanation: "font-weight: bold makes text bold" },
    { id: 6, question: "Which method selects HTML element by ID in JS?", options: ["getElement()", "getElementById()", "selectId()", "findById()"], correct: "B", explanation: "getElementById() selects element by its ID" },
    { id: 7, question: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], correct: "B", explanation: "CSS = Cascading Style Sheets" },
    { id: 8, question: "Which HTML tag is used for largest heading?", options: ["<h6>", "<head>", "<h1>", "<heading>"], correct: "C", explanation: "<h1> is the largest heading tag" },
    { id: 9, question: "What is React.js?", options: ["Database", "Backend framework", "Frontend library", "CSS framework"], correct: "C", explanation: "React is a JavaScript frontend library by Meta" },
    { id: 10, question: "Which property makes a div flexbox?", options: ["display: block", "display: flex", "display: grid", "display: inline"], correct: "B", explanation: "display: flex enables flexbox layout" }
  ],
  "databases": [
    { id: 1, question: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Language", "System Query Logic", "Structured Quick Language"], correct: "A", explanation: "SQL = Structured Query Language" },
    { id: 2, question: "Which SQL command retrieves data?", options: ["GET", "FETCH", "SELECT", "FIND"], correct: "C", explanation: "SELECT statement retrieves data from tables" },
    { id: 3, question: "Which SQL command adds new data?", options: ["ADD", "INSERT", "CREATE", "PUT"], correct: "B", explanation: "INSERT INTO adds new records" },
    { id: 4, question: "What is a primary key?", options: ["First column", "Unique identifier for each row", "Foreign table link", "Auto increment number"], correct: "B", explanation: "Primary key uniquely identifies each record" },
    { id: 5, question: "Which command deletes a table completely?", options: ["DELETE TABLE", "REMOVE TABLE", "DROP TABLE", "CLEAR TABLE"], correct: "C", explanation: "DROP TABLE permanently removes the table" },
    { id: 6, question: "What is a foreign key?", options: ["Key from another country", "Links two tables together", "Encrypted key", "Primary key copy"], correct: "B", explanation: "Foreign key creates relationship between tables" },
    { id: 7, question: "Which clause filters SQL results?", options: ["FILTER", "WHERE", "HAVING", "LIMIT"], correct: "B", explanation: "WHERE clause filters rows based on condition" },
    { id: 8, question: "What does DBMS stand for?", options: ["Data Backup Management System", "Database Management System", "Data Binary Mapping System", "Digital Base Management System"], correct: "B", explanation: "DBMS = Database Management System" },
    { id: 9, question: "Which JOIN returns all rows from both tables?", options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"], correct: "D", explanation: "FULL OUTER JOIN returns all rows from both tables" },
    { id: 10, question: "What is normalization in databases?", options: ["Sorting data", "Removing duplicate data", "Encrypting data", "Indexing data"], correct: "B", explanation: "Normalization organizes data to reduce redundancy" }
  ],
  "computer-networks": [
    { id: 1, question: "What does IP stand for?", options: ["Internet Provider", "Internet Protocol", "Internal Process", "Input Port"], correct: "B", explanation: "IP = Internet Protocol" },
    { id: 2, question: "Which layer of OSI handles routing?", options: ["Physical", "Data Link", "Network", "Transport"], correct: "C", explanation: "Network layer (Layer 3) handles routing" },
    { id: 3, question: "What does HTTP stand for?", options: ["HyperText Transfer Protocol", "High Tech Transfer Protocol", "Hyper Transfer Text Process", "Home Text Transfer Protocol"], correct: "A", explanation: "HTTP = HyperText Transfer Protocol" },
    { id: 4, question: "Which protocol is used for email sending?", options: ["FTP", "HTTP", "SMTP", "DNS"], correct: "C", explanation: "SMTP = Simple Mail Transfer Protocol" },
    { id: 5, question: "What is the total number of OSI layers?", options: ["5", "6", "7", "8"], correct: "C", explanation: "OSI model has 7 layers" },
    { id: 6, question: "Which device connects different networks?", options: ["Switch", "Hub", "Router", "Repeater"], correct: "C", explanation: "Router connects and routes between different networks" },
    { id: 7, question: "What does DNS stand for?", options: ["Domain Name System", "Data Network Service", "Digital Name Server", "Domain Node System"], correct: "A", explanation: "DNS = Domain Name System" },
    { id: 8, question: "Which protocol assigns IP addresses automatically?", options: ["FTP", "DHCP", "DNS", "SMTP"], correct: "B", explanation: "DHCP automatically assigns IP addresses" },
    { id: 9, question: "What is bandwidth?", options: ["Cable thickness", "Data transfer rate", "Network password", "IP address range"], correct: "B", explanation: "Bandwidth is maximum data transfer rate" },
    { id: 10, question: "Which topology connects all devices to central hub?", options: ["Ring", "Bus", "Star", "Mesh"], correct: "C", explanation: "Star topology connects all devices to central hub" }
  ]
}

module.exports = questionBank