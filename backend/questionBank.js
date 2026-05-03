const questionBank = {
  "python-basics": [
    {
      id: 1,
      question: "What is the output of print(2**3)?",
      options: ["6", "8", "9", "5"],
      correct: "B",
      explanation: "** is the power operator, 2^3 = 8"
    },
    {
      id: 2,
      question: "Which keyword defines a function in Python?",
      options: ["func", "def", "function", "define"],
      correct: "B",
      explanation: "The 'def' keyword is used to define functions in Python."
    },
    {
      id: 3,
      question: "What data type is [1,2,3] in Python?",
      options: ["tuple", "dict", "list", "array"],
      correct: "C",
      explanation: "Square brackets are used to create a list."
    },
    {
      id: 4,
      question: "How do you take user input in Python?",
      options: ["scan()", "input()", "read()", "get()"],
      correct: "B",
      explanation: "The input() function reads a line from input."
    },
    {
      id: 5,
      question: "What does len('hello') return?",
      options: ["4", "5", "6", "error"],
      correct: "B",
      explanation: "len() counts characters, and 'hello' has exactly 5 characters."
    },
    {
      id: 6,
      question: "Which of the following is used to create a loop in Python?",
      options: ["for", "loop", "iterate", "repeat"],
      correct: "A",
      explanation: "The 'for' keyword is used to iterate over a sequence."
    },
    {
      id: 7,
      question: "What are the two boolean values in Python?",
      options: ["1 and 0", "Yes and No", "T and F", "True and False"],
      correct: "D",
      explanation: "Python boolean values are capitalized: True and False."
    },
    {
      id: 8,
      question: "What is the correct file extension for Python files?",
      options: [".py", ".python", ".pt", ".pn"],
      correct: "A",
      explanation: "Python scripts are saved with the .py extension."
    },
    {
      id: 9,
      question: "How do you insert a single-line comment in Python?",
      options: ["//", "/*", "#", "--"],
      correct: "C",
      explanation: "Python uses the hash character (#) for single-line comments."
    },
    {
      id: 10,
      question: "How do you print 'Hello' to the screen in Python?",
      options: ["print('Hello')", "echo 'Hello'", "console.log('Hello')", "printf('Hello')"],
      correct: "A",
      explanation: "The print() function outputs data to the console."
    }
  ],
  "data-structures": [
    {
      id: 1,
      question: "Which data structure follows the LIFO principle?",
      options: ["Queue", "Stack", "Tree", "Graph"],
      correct: "B",
      explanation: "Stack follows Last-In-First-Out (LIFO)."
    },
    {
      id: 2,
      question: "Which data structure follows the FIFO principle?",
      options: ["Queue", "Stack", "Tree", "Graph"],
      correct: "A",
      explanation: "Queue follows First-In-First-Out (FIFO)."
    },
    {
      id: 3,
      question: "Which data structure consists of nodes containing data and a pointer to the next node?",
      options: ["Array", "Stack", "Linked List", "Tree"],
      correct: "C",
      explanation: "A Linked List uses nodes that point to the next node in the sequence."
    },
    {
      id: 4,
      question: "Which data structure consists of a root node and children?",
      options: ["Graph", "Array", "Stack", "Tree"],
      correct: "D",
      explanation: "A Tree is a hierarchical structure starting with a root node."
    },
    {
      id: 5,
      question: "What is the time complexity of accessing an element in an array by its index?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      correct: "A",
      explanation: "Arrays allow random access in constant time O(1)."
    },
    {
      id: 6,
      question: "What is the worst-case time complexity of Binary Search?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      correct: "C",
      explanation: "Binary search halves the search space each step, resulting in O(log n)."
    },
    {
      id: 7,
      question: "Which operations are fundamentally associated with a Stack?",
      options: ["Enqueue and Dequeue", "Push and Pop", "Insert and Delete", "Add and Remove"],
      correct: "B",
      explanation: "You 'Push' to add to a stack and 'Pop' to remove from a stack."
    },
    {
      id: 8,
      question: "Which operations are fundamentally associated with a Queue?",
      options: ["Enqueue and Dequeue", "Push and Pop", "Insert and Delete", "Add and Remove"],
      correct: "A",
      explanation: "You 'Enqueue' to add to a queue and 'Dequeue' to remove."
    },
    {
      id: 9,
      question: "An undirected graph with no cycles is strictly called a:",
      options: ["Cycle Graph", "Directed Graph", "Bipartite Graph", "Tree"],
      correct: "D",
      explanation: "A connected, undirected graph with no cycles is the definition of a Tree."
    },
    {
      id: 10,
      question: "What mechanism does a Hash Map use to store elements?",
      options: ["Sorted data", "LIFO", "Key-Value pairs", "FIFO"],
      correct: "C",
      explanation: "Hash maps map unique keys to specific values."
    }
  ],
  "web-development": [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: ["HyperText Markup Language", "HighText Markup Language", "HyperText Machine Language", "HyperLink Markup Language"],
      correct: "A",
      explanation: "HTML stands for HyperText Markup Language."
    },
    {
      id: 2,
      question: "What does CSS stand for?",
      options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
      correct: "B",
      explanation: "CSS stands for Cascading Style Sheets."
    },
    {
      id: 3,
      question: "Which of these is a JavaScript library for building user interfaces?",
      options: ["Django", "Laravel", "React", "Flask"],
      correct: "C",
      explanation: "React is a popular UI library created by Facebook."
    },
    {
      id: 4,
      question: "Which default port is used for HTTP?",
      options: ["21", "22", "443", "80"],
      correct: "D",
      explanation: "Port 80 is the standard port for unencrypted HTTP traffic."
    },
    {
      id: 5,
      question: "Which default port is used for HTTPS?",
      options: ["80", "22", "443", "21"],
      correct: "C",
      explanation: "Port 443 is the standard port for secure HTTPS traffic."
    },
    {
      id: 6,
      question: "Which language is primarily used for frontend web interactivity?",
      options: ["JavaScript", "Python", "C++", "Java"],
      correct: "A",
      explanation: "JavaScript is executed by the browser to create interactive web pages."
    },
    {
      id: 7,
      question: "Which CSS property is used to change the text color?",
      options: ["text-color", "color", "font-color", "text-style"],
      correct: "B",
      explanation: "The 'color' property sets the text color of an element."
    },
    {
      id: 8,
      question: "What is the purpose of the <a> tag in HTML?",
      options: ["Audio", "Article", "Animation", "Hyperlinks"],
      correct: "D",
      explanation: "The anchor tag <a> is used to define hyperlinks."
    },
    {
      id: 9,
      question: "Which HTML attribute specifies the image URL in an <img> tag?",
      options: ["src", "href", "link", "url"],
      correct: "A",
      explanation: "The 'src' (source) attribute contains the URL of the image."
    },
    {
      id: 10,
      question: "What symbol indicates a class selector in CSS?",
      options: ["#", ".", "@", "&"],
      correct: "B",
      explanation: "A period (.) is used to select elements with a specific class."
    }
  ],
  "databases": [
    {
      id: 1,
      question: "What does SQL stand for?",
      options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "Sequential Query Language"],
      correct: "A",
      explanation: "SQL stands for Structured Query Language."
    },
    {
      id: 2,
      question: "What is a Primary Key?",
      options: ["Any key in a table", "A unique identifier for a record", "A foreign key", "An index"],
      correct: "B",
      explanation: "A Primary Key uniquely identifies each record in a database table."
    },
    {
      id: 3,
      question: "Which SQL command is used to retrieve data?",
      options: ["GET", "FETCH", "SELECT", "PULL"],
      correct: "C",
      explanation: "The SELECT statement is used to fetch data from a database."
    },
    {
      id: 4,
      question: "Which SQL command is used to add new data to a table?",
      options: ["ADD", "PUT", "UPDATE", "INSERT"],
      correct: "D",
      explanation: "The INSERT INTO statement is used to insert new records."
    },
    {
      id: 5,
      question: "Which SQL command is used to modify existing data?",
      options: ["UPDATE", "MODIFY", "CHANGE", "ALTER"],
      correct: "A",
      explanation: "The UPDATE statement modifies existing records in a table."
    },
    {
      id: 6,
      question: "Which SQL command deletes an entire table?",
      options: ["DELETE", "DROP", "REMOVE", "ERASE"],
      correct: "B",
      explanation: "DROP TABLE is used to delete a table entirely."
    },
    {
      id: 7,
      question: "Which SQL clause is used to filter records?",
      options: ["FILTER", "HAVING", "WHERE", "MATCH"],
      correct: "C",
      explanation: "The WHERE clause filters records that fulfill a specified condition."
    },
    {
      id: 8,
      question: "Which SQL clause is used to sort the result-set?",
      options: ["SORT BY", "GROUP BY", "ALIGN BY", "ORDER BY"],
      correct: "D",
      explanation: "ORDER BY sorts the result-set in ascending or descending order."
    },
    {
      id: 9,
      question: "Which of the following is considered a NoSQL database?",
      options: ["MongoDB", "MySQL", "PostgreSQL", "Oracle"],
      correct: "A",
      explanation: "MongoDB is a document-oriented NoSQL database."
    },
    {
      id: 10,
      question: "Which JOIN returns rows when there is a match in both tables?",
      options: ["OUTER JOIN", "INNER JOIN", "CROSS JOIN", "LEFT JOIN"],
      correct: "B",
      explanation: "An INNER JOIN selects records that have matching values in both tables."
    }
  ],
  "computer-networks": [
    {
      id: 1,
      question: "What does IP stand for in networking?",
      options: ["Internal Protocol", "Internet Process", "Internet Protocol", "Intranet Protocol"],
      correct: "C",
      explanation: "IP stands for Internet Protocol."
    },
    {
      id: 2,
      question: "What does TCP stand for?",
      options: ["Transport Control Protocol", "Transmission Control Protocol", "Transmission Communication Protocol", "Transfer Control Protocol"],
      correct: "B",
      explanation: "TCP stands for Transmission Control Protocol."
    },
    {
      id: 3,
      question: "How many layers are in the OSI model?",
      options: ["7", "5", "6", "4"],
      correct: "A",
      explanation: "The OSI model consists of 7 layers."
    },
    {
      id: 4,
      question: "Which networking device forwards data packets between computer networks?",
      options: ["Switch", "Hub", "Bridge", "Router"],
      correct: "D",
      explanation: "A Router connects multiple networks and routes packets between them."
    },
    {
      id: 5,
      question: "Which protocol is used for secure web browsing?",
      options: ["HTTP", "FTP", "HTTPS", "SMTP"],
      correct: "C",
      explanation: "HTTPS (Hypertext Transfer Protocol Secure) encrypts web traffic."
    },
    {
      id: 6,
      question: "Which protocol is used for sending emails?",
      options: ["FTP", "SMTP", "HTTP", "SNMP"],
      correct: "B",
      explanation: "Simple Mail Transfer Protocol (SMTP) is used to send emails."
    },
    {
      id: 7,
      question: "What is the size of a MAC address?",
      options: ["48 bits", "32 bits", "64 bits", "128 bits"],
      correct: "A",
      explanation: "A MAC address is a 48-bit physical address."
    },
    {
      id: 8,
      question: "What is the size of an IPv4 address?",
      options: ["16 bits", "32 bits", "64 bits", "128 bits"],
      correct: "B",
      explanation: "IPv4 uses 32-bit addresses."
    },
    {
      id: 9,
      question: "What is the size of an IPv6 address?",
      options: ["32 bits", "64 bits", "128 bits", "256 bits"],
      correct: "C",
      explanation: "IPv6 uses 128-bit addresses to provide a vastly larger address space."
    },
    {
      id: 10,
      question: "What is the function of DNS?",
      options: ["IP to MAC", "MAC to IP", "Domain to MAC", "Translating Domain names to IP addresses"],
      correct: "D",
      explanation: "DNS acts as the phonebook of the internet, converting names like google.com to IP addresses."
    }
  ]
};

module.exports = questionBank;
