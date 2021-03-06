import {placeTextIntoTodosFile} from "../moveToScriptTodos"

describe("Adding new notes into the todos file", () => {
    it("Moves note into specific chapter", () => {
        const replaceToken = "|||NEWNOTE|||"
        const chapterUuid = "07532be5-5d07-4d11-ad12-7c11f3c06792"
        const todoBase = `
# 2-1
- asdfdsf ashjlf halskf hsdalfj hasdjfkl saklfd ajklhsd
- asdfdsf ashjlf halskf hsdalfj hasdjfkl saklfd ajklhsd

<!-- ${chapterUuid} -->
- jkghjkgh kjjhg kghjk jhk gjhk gj
- jkghjkgh kjjhg kghjk jhk gjhk gj${replaceToken}

<!-- c0ab248e-6e66-4023-b283-13e8021639f0 -->
# 2-5
- mvnmb ,m bnnm, b ,m nb ,b , b ,mn
- mvnmb ,m bnnm, b ,m nb ,b , b ,mn

# 2-6
- uyiuytiuy tuy utyi tuyi tyui yuyuituyi
- uyiuytiuy tuy utyi tuyi tyui yuyuituyi
`

        const newNote = "- This note is now here although it wasn't before!"
        const todoBefore = todoBase.replace(replaceToken, "")
        const todoAfter = todoBase.replace(replaceToken, `\n${newNote}`)
        expect(placeTextIntoTodosFile(chapterUuid, todoBefore, newNote)).toEqual(todoAfter)
    })

    it("Moves note into new chapter if chapter was not yet present", () => {
        const replaceToken = "|||NEWNOTE|||"
        const chapterUuidNotInTodos = "07532be5-5d07-4d11-ad12-7c11f3c06792"
        const todoBase = `
# 2-1
- asdfdsf ashjlf halskf hsdalfj hasdjfkl saklfd ajklhsd
- asdfdsf ashjlf halskf hsdalfj hasdjfkl saklfd ajklhsd

- jkghjkgh kjjhg kghjk jhk gjhk gj
- jkghjkgh kjjhg kghjk jhk gjhk gj

<!-- c0ab248e-6e66-4023-b283-13e8021639f0 -->
# 2-5
- mvnmb ,m bnnm, b ,m nb ,b , b ,mn
- mvnmb ,m bnnm, b ,m nb ,b , b ,mn

# 2-6
- uyiuytiuy tuy utyi tuyi tyui yuyuituyi
- uyiuytiuy tuy utyi tuyi tyui yuyuituyi${replaceToken}`

        const newNote = "- This note is now here although it wasn't before!"
        const todoBefore = todoBase.replace(replaceToken, "")
        const todoAfter = todoBase.replace(replaceToken, `\n\n<!-- ${chapterUuidNotInTodos} -->\n${newNote}\n`)
        expect(placeTextIntoTodosFile(chapterUuidNotInTodos, todoBefore, newNote)).toEqual(todoAfter)
    })
})
