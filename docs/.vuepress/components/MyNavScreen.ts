// import { useScrollLock } from "@vueuse/core"; // FIXME[iOS Scroll]
import {
    Transition,
    defineComponent,
    h,
    ref,
    onBeforeUnmount,
    onMounted,
    watch,
} from "vue";
import { useRoute } from "vue-router";

import { useMobile } from "vuepress-theme-hope/lib/client/composables";
import NavScreenLinks from "./MyNavScreenLinks";    // 需要手动引入
import OutlookSettings from "vuepress-theme-hope/lib/client/module/outlook/components/OutlookSettings";

import type { VNode } from "vue";

import "vuepress-theme-hope/lib/client/module/navbar/styles/nav-screen.scss";

import Bus from './Bus'

export default defineComponent({
    name: "NavScreen",

    props: {
        active: Boolean,
    },

    emits: ["close"],

    setup(props, { emit, slots }) {
        const route = useRoute();
        const isMobile = useMobile();

        const body = ref<HTMLElement | null>();
        // FIXME: iOS下下拉导航栏滚动问题，目前暂时为了体验绕开了这个bug，但是引入了新的问题，在打开下拉导航栏的时候主界面无法锁定滚动
        /*
        2022.8.26：
        在原主题中的实现中，在iOS中，点开下拉导航栏，即使内容没有展示完全，也无法进行进行页面滚动。
        在与Mr.Hope交流之后，得知这是一个在上游包中已经被报告的错误，是vueuse中的已知问题。
        原作者在主题中使用了 useScrollLock(body) 期望禁用底层页面的滚动，但是该函数在iOS设备上有兼容性问题，目前尚未得到解决。
        我目前的做法是为了平衡页面展示体验，删除了所有对于 useScrollLock 的调用，从而减少带来的影响。
        后续问题的解决，估计需要等到上游代码的更改了。
        在后续代码中，将所有此问题导致的对代码的修改记作：FIXME[iOS Scroll]
         */
        // const isLocked = useScrollLock(body); // FIXME[iOS Scroll]

        // 监听信号，爷孙组件通信
        // 实现参考：https://vue3.chengpeiquan.com/communication.html
        Bus.on("close", () => {
            // isLocked.value = false; // FIXME[iOS Scroll]
            emit("close");});

        watch(isMobile, (value) => {
            if (!value && props.active) emit("close");
        });

        watch(
            () => route.path,
            () => {
                // isLocked.value = false; // FIXME[iOS Scroll]
                emit("close");
            }
        );

        onMounted(() => {
            body.value = document.body;
        });

        onBeforeUnmount(() => {
            // isLocked.value = false; // FIXME[iOS Scroll]
        });

        return (): VNode =>
            h(
                Transition,
                {
                    name: "fade",
                    onEnter: () => {
                        // isLocked.value = true; // FIXME[iOS Scroll]
                    },
                    onAfterLeave: () => {
                        // isLocked.value = false; // FIXME[iOS Scroll]
                    },
                },
                () =>
                    props.active
                        ? h(
                            "div",
                            { id: "nav-screen" },
                            h("div", { class: "container" }, [
                                slots["before"]?.(),
                                h(NavScreenLinks),
                                h("div", { class: "outlook-wrapper" }, h(OutlookSettings)),
                                slots["after"]?.(),
                            ])
                        )
                        : null
            );
    },
});
