<template>
    <div class="l-table">
        <div class="table-section">
            <Table ref="table"
                   :data="tableOption.data"
                   :columns="tableOption.columns"
                   :stripe="tableOption.stripe"
                   :border="tableOption.border"
                   :show-header="tableOption.showHeader"
                   :width="tableOption.width"
                   :height="tableOption.height"
                   :max-height="tableOption.maxHeight"
                   :loading="tableOption.loading"
                   :disabled-hover="tableOption.disabledHover"
                   :highlight-row="tableOption.highlightRow"
                   :row-class-name="tableOption.rowClassName"
                   :size="tableOption.size"
                   :no-data-text="tableOption.noDataText"
                   :no-filtered-data-text="tableOption.noFilteredDataText"
                   :draggable="tableOption.draggable"
                   :tooltip-theme="tableOption.tooltipTheme"
                   :row-key="tableOption.rowKey"
                   @on-current-change="onCurrentChange"
                   @on-select="onSelect"
                   @on-select-cancel="onSelectCancel"
                   @on-select-all="onSelectAll"
                   @on-select-all-cancel="onSelectAllCancel"
                   @on-selection-change="onSelectionChange"
                   @on-sort-change="onSortChange"
                   @on-filter-change="onFilterChange"
                   @on-row-click="onRowClick"
                   @on-row-dblclick="onRowDblclick"
                   @on-expand="onExpand"
                   @on-drag-drop="onDragDrop">
                <template v-for="item in table.columns" v-if="item.slot && item.slot != 'tableIndex'"
                          slot-scope="{row, index, column}" :slot="item.slot">
                    <slot :name="item.slot" :row="row" :index="index" :column="column">
                    </slot>
                </template>
                <template slot="header">
                    <slot name="header"></slot>
                </template>
                <template slot="footer">
                    <slot name="footer"></slot>
                </template>
                <template slot="loading">
                    <slot name="loading"></slot>
                </template>
                <template slot="tableIndex" slot-scope="{row, index, column}">
                    <div>
                        {{((page.current || 1) - 1) * (page.pageSize || 10) + index + 1}}
                    </div>
                </template>
            </Table>
        </div>
        <div class="page-section">
            <Page
                :current="page.current"
                :total="page.total"
                :page-size="page.pageSize"
                :page-size-opts="page.pageSizeOpts"
                :placement="page.placement"
                :size="page.size"
                :simple="page.simple"
                :show-total="page.showTotal"
                :show-elevator="page.showElevator"
                :show-sizer="page.showSizer"
                :class-name="page.className"
                :styles="page.styles"
                :transfer="page.transfer"
                :prev-text="page.prevText"
                :next-text="page.nextText"
                @on-change="onChange"
                @on-page-size-change="onPageSizeChange">
                <slot name="total"></slot>
            </Page>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LTable",
        props: {
            table: {
                type: Object,
                default: () => {
                    return {};
                }
            },
            page: {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
        data () {
            return {
                tableOption: this.transformTableOption(this.table)
            }
        },
        watch: {
            table: {
                handler (val) {
                    this.transformTableOption(val);
                    this.tableOption = this.transformTableOption(this.table);
                },
                deep: true
            }
        },
        methods: {
            onCurrentChange () {
                this.$emit('on-current-change', ...arguments);
            },
            onSelect () {
                this.$emit('on-select', ...arguments);
            },
            onSelectCancel () {
                this.$emit('on-select-cancel', ...arguments);
            },
            onSelectAll() {
                this.$emit('on-select-all', ...arguments);
            },
            onSelectAllCancel () {
                this.$emit('on-select-all-cancel', ...arguments);
            },
            onSelectionChange () {
                this.$emit('on-selection-change', ...arguments);
            },
            onSortChange () {
                this.$emit('on-sort-change', ...arguments);
            },
            onFilterChange () {
                this.$emit('on-filter-change', ...arguments);
            },
            onRowClick () {
                this.$emit('on-row-click', ...arguments);
            },
            onRowDblclick () {
                this.$emit('on-row-dblclick', ...arguments);
            },
            onExpand () {
                this.$emit('on-expand', ...arguments);
            },
            onDragDrop () {
                this.$emit('on-drag-drop', ...arguments);
            },
            onChange () {
                this.$emit('on-change', ...arguments);
            },
            onPageSizeChange () {
                this.$emit('on-page-size-change', ...arguments);
            },

            exportCsv (params) {
                this.$refs.table.exportCsv(params);
            },
            clearCurrentRow () {
                this.$refs.table.clearCurrentRow()
            },

            objClone(obj) {
                if (!obj || typeof obj !== "object") return obj;
                let objClone = Array.isArray(obj) ? [] : {};
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (obj[key] && typeof obj[key] === "object") {
                            objClone[key] = this.objClone(obj[key]);
                        } else {
                            objClone[key] = obj[key];
                        }
                    }
                }
                return objClone;
            },
            transformTableOption (option) {
                let tableOption = this.objClone(option);
                if (tableOption.columns && Array.isArray(tableOption.columns)) {
                    if(tableOption.index) {
                        tableOption.columns.unshift({
                            title: tableOption.indexLabel || '序号',
                            width: 60,
                            slot: 'tableIndex',
                            align: 'center'
                        })
                    }
                }
                return tableOption;
            }

        }
    }
</script>

<style lang="scss" scoped>
    .l-table {
        position: relative;
        .table-section {
            margin-bottom: 10px;
        }
        .page-section {
            margin-right: 5px;
            text-align: right;
        }
    }
</style>
