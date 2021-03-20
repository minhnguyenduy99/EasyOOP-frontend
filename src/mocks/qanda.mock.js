const questions = [
  {
    question: "Trừu tượng hóa là gì ?",
    answer: "Abstraction is the concept of object-oriented programming that 'shows' only essential attributes and 'hides' unnecessary information",
    redirect_to: "/"
  },
  {
    question: "Học OOP như thế nào cho hiệu quả ?",
    answer: "Best way to learn OOP concepts is to write more and more code and get it reviewed often. Practice maketh a good programmer.",
    redirect_to: null
  },
  {
    question: "Một số tools dùng để thiết kế lớp OOP ?",
    answer: "LucidChart, Visio,...",
    redirect_to: null
  }
];

export default {
  async findQuestions(search, limitOptions = {}) {
    return {
      data: questions
    };
  }
};
