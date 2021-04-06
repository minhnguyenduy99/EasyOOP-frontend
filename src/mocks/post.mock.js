const posts = [
  {
    post_id: "60477bbae82d0302c40ddc05",
    post_title: "Tính đóng gói trong OOP",
    topic_title: "KHÁI NIỆM CƠ BẢN",
    topic_id: "605415e98efd76b77a1c0257",
    tags: ["Tag A", "Tag B"],
    post_status: "0",
    thumbnail_file_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    content_file_url:
      "https://res.cloudinary.com/dml8e1w0z/raw/upload/v1616118378/POSTS/post.md_vshemv.txt",
    created_date: Date.now(),
    previous_post_id: null,
    next_post_id: "6054169b9340314dd269f21f"
  },
  {
    post_id: "6054169b9340314dd269f21f",
    post_title: "Tính trừu tượng hóa trong OOP",
    topic_title: "KHÁI NIỆM CƠ BẢN",
    topic_id: "605415e98efd76b77a1c0257",
    tags: ["Tag A", "Tag B"],
    post_status: "0",
    thumbnail_file_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    content_file_url:
      "https://res.cloudinary.com/dml8e1w0z/raw/upload/v1616159099/POSTS/post.md_rcmfcv.txt",
    created_date: Date.now(),
    previous_post_id: "60477bbae82d0302c40ddc05",
    next_post_id: "605416d3f8c0585848887b0f"
  },
  {
    post_id: "605416d3f8c0585848887b0f",
    post_title: "Tính kế thừa trong OOP",
    topic_title: "KHÁI NIỆM CƠ BẢN",
    topic_id: "605415e98efd76b77a1c0257",
    tags: ["Tag A", "Tag B"],
    post_status: "0",
    thumbnail_file_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    content_file_url:
      "https://res.cloudinary.com/dml8e1w0z/raw/upload/v1616156014/POSTS/post.md_iblxhr.txt",
    created_date: Date.now(),
    previous_post_id: "6054169b9340314dd269f21f",
    next_post_id: "605416fba8c6f5f1439dcc80"
  },
  {
    post_id: "605416fba8c6f5f1439dcc80",
    post_title: "Tính đa hình trong OOP",
    topic_title: "KHÁI NIỆM CƠ BẢN",
    topic_id: "605415e98efd76b77a1c0257",
    tags: ["Tag A", "Tag B"],
    post_status: "0",
    thumbnail_file_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    content_file_url:
      "https://res.cloudinary.com/dml8e1w0z/raw/upload/v1616156014/POSTS/post.md_iblxhr.txt",
    created_date: Date.now(),
    previous_post_id: "605416d3f8c0585848887b0f",
    next_post_id: null
  },
  // Solid posts
  {
    post_id: "605418e4aeafce2d127ef028",
    post_title: "Single Responsibility Principle",
    topic_title: "Nguyên tắc SOLID",
    topic_id: "60477dbeb8229be06bbc061f",
    tags: ["Tag A", "Tag B"],
    post_status: "0",
    thumbnail_file_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    content_file_url:
      "https://res.cloudinary.com/dml8e1w0z/raw/upload/v1616156014/POSTS/post.md_iblxhr.txt",
    created_date: Date.now(),
    previous_post_id: null,
    next_post_id: "605419086b5844443d567f8a"
  },
  {
    post_id: "605419086b5844443d567f8a",
    post_title: "Open/Closed Principle",
    topic_title: "Nguyên tắc SOLID",
    topic_id: "60477dbeb8229be06bbc061f",
    tags: ["Tag A", "Tag B"],
    post_status: "0",
    thumbnail_file_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    content_file_url:
      "https://res.cloudinary.com/dml8e1w0z/raw/upload/v1616156014/POSTS/post.md_iblxhr.txt",
    created_date: Date.now(),
    previous_post_id: "605418e4aeafce2d127ef028",
    next_post_id: "605419239012de5edc5fb9f1"
  },
  {
    post_id: "605419239012de5edc5fb9f1",
    post_title: "Liskov Substitution Principle",
    topic_title: "Nguyên tắc SOLID",
    topic_id: "60477dbeb8229be06bbc061f",
    tags: ["Tag A", "Tag B"],
    post_status: "0",
    thumbnail_file_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    content_file_url:
      "https://res.cloudinary.com/dml8e1w0z/raw/upload/v1616156014/POSTS/post.md_iblxhr.txt",
    created_date: Date.now(),
    previous_post_id: "605419086b5844443d567f8a",
    next_post_id: "6054194e83a116de613f54d3"
  },
  {
    post_id: "6054194e83a116de613f54d3",
    post_title: "Interface Segregation Principle",
    topic_title: "Nguyên tắc SOLID",
    topic_id: "60477dbeb8229be06bbc061f",
    tags: ["Tag A", "Tag B"],
    post_status: "0",
    thumbnail_file_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    content_file_url:
      "https://res.cloudinary.com/dml8e1w0z/raw/upload/v1616156014/POSTS/post.md_iblxhr.txt",
    created_date: Date.now(),
    previous_post_id: "605419239012de5edc5fb9f1",
    next_post_id: "6054196aabaf4009a32f2a2e"
  },
  {
    post_id: "6054196aabaf4009a32f2a2e",
    post_title: "Dependency Inversion Principle",
    topic_title: "Nguyên tắc SOLID",
    topic_id: "60477dbeb8229be06bbc061f",
    tags: ["Tag A", "Tag B"],
    post_status: "0",
    thumbnail_file_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    content_file_url:
      "https://res.cloudinary.com/dml8e1w0z/raw/upload/v1616156014/POSTS/post.md_iblxhr.txt",
    created_date: Date.now(),
    previous_post_id: "6054194e83a116de613f54d3",
    next_post_id: null
  }
];

export default {
  async searchPosts(search) {
    const filteredPosts = posts.filter(() => Math.random() > 0.5);
    return {
      data: {
        results: filteredPosts
      }
    };
  },

  async getPostsByStatus(options) {
    return {
      data: {
        page: 1,
        next: null,
        previous: null,
        results: posts
      }
    };
  },

  async getPostById(postId) {
    const post = posts.filter(post => post.post_id === postId)?.[0];
    if (!post) {
      return {
        error: "Post not found"
      };
    }
    return {
      data: post
    };
  },

  async getPostGroupedByTopics(limitOptions = {}) {
    const topics = new Map();
    posts.forEach(post => {
      const postObj = {
        post_title: post.post_title,
        post_id: post.post_id
      };
      if (!topics.has(post.topic_id)) {
        topics.set(post.topic_id, {
          topic_id: post.topic_id,
          topic_title: post.topic_title,
          list_posts: [postObj]
        });
        return;
      }
      topics.get(post.topic_id).list_posts.push(postObj);
    });
    return {
      data: {
        next: "http://localhost:3000/posts/topics?start&limit&post-count",
        results: [...topics.values()]
      }
    };
  }
};
