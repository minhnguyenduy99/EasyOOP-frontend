<template>
  <div id="user-view-menu-navbar">
    <b-navbar class="is-relative">
      <template #start>
        <b-navbar-item id="menu-container" tag="div">
          <menu-dropdown-content
            :children-menu="rootMenus"
            :find-menu="$api.menus.getMenu"
          />
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item id="search-item" tag="div">
          <b-button
            @click="showSearchModal = true"
            icon-right="search"
            type="is-primary"
          />
        </b-navbar-item>
      </template>
    </b-navbar>
    <b-modal v-model="showSearchModal" id="search-modal">
      <div class="is-flex is-flex-direction-column is-align-self-flex-start">
        <b-input
          id="search-input"
          type="is-primary"
          size="is-large"
          icon-right="search"
          placeholder="Tìm kiếm bài viết, câu hỏi, ..."
          v-model="search"
        />
        <transition
          name="search-panel"
          enter-active-class="animate__animated animate__fadeInUp"
          leave-active-class="animate__animated animate__fadeOutDown"
        >
          <div id="search-panel-modal" class="card mt-3" v-show="search !== ''">
            <div id="search-panel-container" class="card-content">
              <search-panel panel-title="Bài viết" :items="listPosts">
                <template #item="{ item }">
                  <search-post-view
                    :post="item"
                    @click="$_navigateToPostView"
                  />
                </template>
              </search-panel>
              <search-panel panel-title="Q & A" :items="listQuestions">
                <template #item="{ item }">
                  <qanda-card :qanda="item" :open="false" />
                </template>
              </search-panel>
            </div>
          </div>
        </transition>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { MenuDropdownContent } from "@/components";
import { mapActions } from "vuex";
import { FunctionDelayer } from "../../utils";

export default {
  name: "UserViewMenuNavbar",
  components: {
    MenuDropdownContent,
    "search-panel": () => import("./components/search-panel"),
    "qanda-card": async () => (await import("@/components")).QandACard,
    "search-post-view": () => import("./components/search-post-view")
  },
  data: () => ({
    rootMenus: [],
    search: "",
    listPosts: [],
    listQuestions: [],
    showSearchModal: false,
    handler: new FunctionDelayer()
  }),
  watch: {
    search(val) {
      if (!val) {
        this.handler.reset();
        return;
      }
      this.handler.execute(() => this.$_updateFilteredPosts(val));
      this.$_udpateFilteredQuestions();
    }
  },
  created: function() {
    this.$api.menus.getMenu().then(result => {
      const { error, data } = result;
      if (error) {
        return;
      }
      this.rootMenus.push(...data.children_menu);
    });
  },
  methods: {
    ...mapActions("POST", ["getPosts"]),
    $_navigateToPostView(post) {
      this.search = "";
      this.showSearchModal = false;
      this.$nextTick(() => {
        this.$router.push({
          name: "PostView",
          params: { post_id: post.post_id }
        });
      });
    },
    async $_updateFilteredPosts(search) {
      return this.getPosts({
        searchOptions: {
          search
        }
      }).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.listPosts.length = 0;
        this.listPosts.push(...data.results);
      });
    },
    async $_udpateFilteredQuestions(search) {
      return this.$api.qanda.searchQuestions(search).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.listQuestions.length = 0;
        this.listQuestions.push(...data.results);
      });
    }
  }
};
</script>

<style scoped lang="scss">
#search-item {
  position: static;
  #search-panel-modal {
    position: absolute;
    width: 95vw;
    right: 1rem;
    top: 100%;
    height: fit-content;
  }
}

#search-panel-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @include tablet {
    grid-template-columns: 1fr 1fr;
  }
}

#search-modal.modal {
  padding-top: 4rem;
  justify-content: flex-start;
  overflow: hidden;

  #search-input {
    width: 50%;
  }

  .modal-content {
    overflow-y: hidden;
    scroll-behavior: auto;
  }
}
</style>
