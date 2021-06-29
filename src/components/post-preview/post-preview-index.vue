<template>
  <div class="post-preview-index">
    <div class="mb-4">
      <span class="is-size-4 has-text-grey has-text-weight-bold">{{
        title
      }}</span>
    </div>
    <div ref="index-tree" />
    <div v-if="isIndexTreeEmpty">
      <slot name="empty-state">
        <span class="is-size-5">{{ emptyText }}</span>
      </slot>
    </div>
  </div>
</template>

<script>
const LINE_MARKUP = "data-v-md-line";

export default {
  name: "PostPreviewIndex",
  props: {
    title: {
      type: String,
      required: false,
      default: () => "Index"
    },
    html: String,
    allowLevels: {
      type: String,
      default: () => "h2 h3"
    },
    emptyText: {
      type: String,
      default: () => "There is no index set up"
    },
    anchorClass: {
      type: String,
      default: () => "index-anchor"
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
  mounted: function() {
    this.indexTree = this.createIndex();
    this.$on_renderIndexTree();
  },
  watch: {
    html(val) {
      if (!val) {
        delete this.indexTree;
        this.indexTree = {};
        return;
      }
      this.indexTree = this.createIndex();
      this.$on_renderIndexTree();
    }
  },
  computed: {
    isIndexTreeEmpty() {
      return Object.keys(this.indexTree).length === 0;
    }
  },
  methods: {
    $on_renderIndexTree() {
      const indexEl = this.$refs["index-tree"];
      while (indexEl.firstChild) {
        indexEl.removeChild(indexEl.firstChild);
      }
      this.createHTMLTree();
    },
    createIndex() {
      const div = document.createElement("div");
      div.innerHTML = this.html;

      const children = div?.childNodes;
      if (!children) {
        return {};
      }
      let indexStack = [];
      indexStack.push({
        index: 0,
        list: []
      });
      const levelStr = this.levels.reduce((pre, cur) => pre + cur, "");

      const headingRegex = RegExp(`^H[${levelStr}]$`, "g");

      children.forEach(child => {
        const tagName = child?.tagName;
        if (!headingRegex.test(tagName)) {
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
      el.style.marginBottom = "8px";
      el.style.display = "block";
      el.classList.add(this.anchorClass);
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

<style lang="scss">
.post-preview-index {
  padding-left: 1.5rem;
  border-left: 10px solid $primary;
}

a.index-anchor {
  font-size: 0.85rem;
  &:hover {
    color: $link;
    font-weight: bold;
  }
}
</style>
