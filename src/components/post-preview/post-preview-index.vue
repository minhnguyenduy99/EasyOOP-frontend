<template>
  <div class="post-preview-index">
    <div class="mb-4">
      <span class="is-size-4 has-text-grey has-text-weight-bold">Index</span>
    </div>
    <div v-if="!isIndexTreeEmpty" ref="index-tree"></div>
    <slot v-else name="empty-state">
      <span class="is-size-5">{{ emptyText }}</span>
    </slot>
  </div>
</template>

<script>
const LINE_MARKUP = "data-v-md-line";

export default {
  name: "PostPreviewIndex",
  props: {
    html: String,
    allowLevels: {
      type: String,
      default: () => "h2 h3"
    },
    emptyText: {
      type: String,
      default: () => "There is no index set up"
    }
  },
  data: () => ({
    DEFAULT_INDENTATION: 1,
    indexTree: {},
    levels: []
  }),
  created: function() {
    this.levels = this.allowLevels.split(" ").map(level => parseInt(level[1]));
  },
  watch: {
    html(val) {
      if (!val) {
        return;
      }
      this.indexTree = this.createIndex();
      this.$nextTick(() => {
        this.createHTMLTree();
      });
    }
  },
  computed: {
    isIndexTreeEmpty() {
      return Object.keys(this.indexTree).length === 0;
    }
  },
  methods: {
    createIndex() {
      const div = document.createElement("div");
      div.innerHTML = this.html;
      console.log(this.html[0]);

      const children = div?.childNodes;
      if (!children) {
        return {};
      }
      let indexStack = [];
      indexStack.push({
        index: 0,
        list: []
      });

      const headingRegex = /^H[1-6]$/g;

      children.forEach(child => {
        const tagName = child?.tagName;
        if (!tagName?.match(headingRegex)) {
          return;
        }
        const childIndexValue = parseInt(tagName[1]);
        let upperIndex = indexStack[indexStack.length - 1];
        while (childIndexValue <= upperIndex.tagType && indexStack.length > 1) {
          indexStack.pop();
          upperIndex = indexStack[indexStack.length - 1];
        }
        const childIndex = {
          tagType: childIndexValue,
          title: child.textContent,
          lineIndex: child.getAttribute(LINE_MARKUP),
          list: []
        };
        upperIndex.list.push(childIndex);
        indexStack.push(childIndex);
      });

      return indexStack[0].list;
    },
    createHTMLTree() {
      this.indexTree.forEach(indexValue => {
        this.addNodes(indexValue);
      });
    },
    addNodes(current) {
      if (!current) {
        return;
      }
      const { tagType, title, list, lineIndex } = current;
      const indentation = this.DEFAULT_INDENTATION * (tagType - this.levels[0]);
      if (indentation < 0) {
        return;
      }
      const el = document.createElement("a");
      el.text = title;
      el.style.marginLeft = `${indentation}rem`;
      el.style.marginBottom = "10px";
      el.style.display = "block";
      el.setAttribute(LINE_MARKUP, lineIndex);
      el.addEventListener(
        "click",
        function() {
          this.$emit("index-clicked", lineIndex);
        }.bind(this)
      );
      this.$refs["index-tree"].appendChild(el);
      if (!list || list.length === 0) {
        return;
      }
      list.forEach(val => {
        this.addNodes(val);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.post-preview-index {
  padding-left: 1.5rem;
  border-left: 10px solid $primary-light;
  margin-bottom: -16px;
}
</style>
