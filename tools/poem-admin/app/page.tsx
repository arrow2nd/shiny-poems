'use client'

import { useState, useEffect, useMemo } from 'react'
import './globals.css'

interface Poem {
  id: string
  idolName: string
  clothesTitle: string
  clothesName: string
  text: string
}

interface PoemData {
  updatedAt: string
  poems: Poem[]
}

export default function PoemAdmin() {
  const [data, setData] = useState<PoemData | null>(null)
  const [filteredPoems, setFilteredPoems] = useState<Poem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPoem, setEditingPoem] = useState<Poem | null>(null)
  const [formData, setFormData] = useState<Partial<Poem>>({})
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState<{field: string, suggestions: string[], index: number} | null>(null)

  // 入力補完用のデータ
  const suggestions = useMemo(() => {
    if (!data) return { ids: [], idols: [], clothesTitles: [], clothesNames: [], poemTexts: [] }
    
    const ids = [...new Set(data.poems.map(p => p.id))].sort()
    const idols = [...new Set(data.poems.map(p => p.idolName))].sort()
    const clothesTitles = [...new Set(data.poems.map(p => p.clothesTitle))].sort()
    const clothesNames = [...new Set(data.poems.map(p => p.clothesName))].sort()
    const poemTexts = [...new Set(data.poems.map(p => p.text))].sort()
    
    return { ids, idols, clothesTitles, clothesNames, poemTexts }
  }, [data])

  useEffect(() => {
    loadPoems()
  }, [])

  useEffect(() => {
    if (data) {
      const query = searchQuery.toLowerCase()
      const filtered = data.poems.filter(poem => 
        poem.idolName.toLowerCase().includes(query) ||
        poem.clothesTitle.toLowerCase().includes(query) ||
        poem.clothesName.toLowerCase().includes(query) ||
        poem.text.toLowerCase().includes(query)
      )
      setFilteredPoems(filtered)
    }
  }, [data, searchQuery])

  const loadPoems = async () => {
    try {
      const response = await fetch('/api/poems')
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Failed to load poems:', error)
    }
  }

  const openModal = (poem?: Poem) => {
    setEditingPoem(poem || null)
    setFormData(poem || {
      idolName: '',
      clothesTitle: '',
      clothesName: '',
      text: ''
    })
    setErrors([])
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingPoem(null)
    setFormData({})
    setErrors([])
    setActiveSuggestion(null)
  }

  // タブ補完の処理
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, fieldName: string, suggestionList: string[]) => {
    if (e.key === 'Tab') {
      const currentValue = (formData as any)[fieldName] || ''
      const matchingSuggestions = suggestionList.filter(suggestion => 
        suggestion.toLowerCase().includes(currentValue.toLowerCase())
      )
      
      // 1つの候補しかなく、その候補が既に選択されている場合は通常のTab操作を許可
      if (activeSuggestion && 
          activeSuggestion.field === fieldName && 
          activeSuggestion.suggestions.length === 1 &&
          currentValue === activeSuggestion.suggestions[0]) {
        setActiveSuggestion(null)
        return // 通常のTab操作を許可
      }
      
      // 補完候補がある場合のみpreventDefaultで通常のTab操作を阻止
      if (matchingSuggestions.length > 0) {
        e.preventDefault()
        
        if (!activeSuggestion || activeSuggestion.field !== fieldName) {
          // 新しい補完を開始
          setActiveSuggestion({
            field: fieldName,
            suggestions: matchingSuggestions,
            index: 0
          })
          setFormData({ ...formData, [fieldName]: matchingSuggestions[0] })
        } else {
          // 次の候補に移動
          const nextIndex = (activeSuggestion.index + 1) % matchingSuggestions.length
          setActiveSuggestion({
            ...activeSuggestion,
            index: nextIndex
          })
          setFormData({ ...formData, [fieldName]: matchingSuggestions[nextIndex] })
        }
      }
      // 補完候補がない場合はTabキーの通常動作（次のフィールドにフォーカス）を許可
    } else if (e.key === 'Enter' && activeSuggestion && activeSuggestion.field === fieldName) {
      e.preventDefault()
      setActiveSuggestion(null) // Enterで補完を確定
    } else if (e.key === 'Escape') {
      setActiveSuggestion(null)
    }
  }

  const handleInputChange = (fieldName: string, value: string) => {
    const updatedFormData = { ...formData, [fieldName]: value }
    setFormData(updatedFormData)
    setActiveSuggestion(null) // 手動入力時は補完をリセット
  }

  // ポエムテキストの自動生成
  const generatePoemText = (clothesName: string): string => {
    if (!data) return ''
    
    // 同じ衣装名のポエムを検索
    const matchingPoems = data.poems.filter(poem => 
      poem.clothesName === clothesName || poem.clothesTitle === clothesName
    )
    
    if (matchingPoems.length === 0) return ''
    
    // ランダムに1つ選択
    const randomPoem = matchingPoems[Math.floor(Math.random() * matchingPoems.length)]
    const poemText = randomPoem.text
    
    // 区切り文字で分割（。やスペース、その他の記号）
    const separators = /[。、～\s!！?？・…]+/
    const fragments = poemText.split(separators).filter(fragment => fragment.trim().length > 0)
    
    if (fragments.length > 0) {
      return fragments[0].trim()
    }
    
    return ''
  }

  // 衣装名のフォーカスが外れた時の処理
  const handleClothesNameBlur = () => {
    // 衣装タイトルの自動コピー
    if (formData.clothesName && !formData.clothesTitle) {
      setFormData(prev => ({ ...prev, clothesTitle: formData.clothesName }))
    }
    
    // ポエムテキストの自動生成（空の場合のみ）
    if (formData.clothesName && !formData.text) {
      const generatedText = generatePoemText(formData.clothesName)
      if (generatedText) {
        setFormData(prev => ({ ...prev, text: generatedText }))
      }
    }
    
    // ID自動生成
    generateIdIfPossible(formData)
  }

  // IDの自動生成
  const generateIdIfPossible = async (updatedFormData: Partial<Poem>) => {
    if (updatedFormData.clothesName && updatedFormData.idolName && !updatedFormData.id) {
      try {
        const response = await fetch('/api/generate-id', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clothesName: updatedFormData.clothesName,
            idolName: updatedFormData.idolName,
            existingIds: suggestions.ids
          })
        })
        const result = await response.json()
        if (result.id) {
          setFormData(prev => ({ ...prev, id: result.id }))
        }
      } catch (error) {
        console.error('自動ID生成エラー:', error)
        // フォールバック: 基本的な変換
        const basicId = `${updatedFormData.clothesName.replace(/[^a-zA-Z0-9]/g, '')}_${updatedFormData.idolName.replace(/[^a-zA-Z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, '')}`
        setFormData(prev => ({ ...prev, id: basicId }))
      }
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setErrors([])

    try {
      const action = editingPoem ? 'update' : 'create'
      
      // 新規追加時にIDが空なら自動生成をAPIに依頼
      let poemData = { ...formData }
      if (action === 'create' && !poemData.id && poemData.clothesName && poemData.idolName) {
        try {
          const response = await fetch('/api/generate-id', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              clothesName: poemData.clothesName,
              idolName: poemData.idolName,
              existingIds: suggestions.ids
            })
          })
          const result = await response.json()
          if (result.id) {
            poemData.id = result.id
          }
        } catch (error) {
          console.error('自動ID生成エラー:', error)
          // フォールバック: 基本的な変換
          const basicId = `${poemData.clothesName.replace(/[^a-zA-Z0-9]/g, '')}_${poemData.idolName.replace(/[^a-zA-Z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, '')}`
          poemData.id = basicId
        }
      }
      
      const response = await fetch('/api/poems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, poem: poemData })
      })

      const result = await response.json()

      if (!response.ok) {
        setErrors(result.errors || ['エラーが発生しました'])
        return
      }

      await loadPoems()
      closeModal()
    } catch (error) {
      setErrors(['保存中にエラーが発生しました'])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (poem: Poem) => {
    if (!confirm(`「${poem.clothesTitle}」を削除しますか？`)) return

    try {
      const response = await fetch('/api/poems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', poem })
      })

      if (response.ok) {
        await loadPoems()
      }
    } catch (error) {
      console.error('Failed to delete poem:', error)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>シャニポエム管理画面</h1>
        {data && (
          <div className="stats">
            <span>総ポエム数: {data.poems.length}件</span>
            <span>最終更新: {data.updatedAt}</span>
          </div>
        )}
      </div>

      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="アイドル名、衣装名、ポエムで検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="button" onClick={() => openModal()}>
          新規追加
        </button>
      </div>

      <div className="poem-list">
        {filteredPoems.map((poem) => (
          <div
            key={poem.id}
            className="poem-item"
            onClick={() => openModal(poem)}
          >
            <div className="poem-idol">{poem.idolName}</div>
            <div className="poem-clothes">{poem.clothesTitle} / {poem.clothesName}</div>
            <div className="poem-text">{poem.text}</div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingPoem ? 'ポエム編集' : '新規ポエム追加'}</h2>
            
            {errors.length > 0 && (
              <div className="error">
                {errors.map((error, i) => (
                  <div key={i}>{error}</div>
                ))}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">アイドル名</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-input"
                  value={formData.idolName || ''}
                  onChange={(e) => handleInputChange('idolName', e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'idolName', suggestions.idols)}
                  placeholder="Tabキーで補完"
                />
                {activeSuggestion && activeSuggestion.field === 'idolName' && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '8px',
                    fontSize: '12px',
                    color: '#666',
                    zIndex: 1000
                  }}>
                    {activeSuggestion.index + 1}/{activeSuggestion.suggestions.length} 候補 (Tab: 次へ, Enter: 確定, Esc: キャンセル)
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">衣装名</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-input"
                  value={formData.clothesName || ''}
                  onChange={(e) => handleInputChange('clothesName', e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'clothesName', suggestions.clothesNames)}
                  onBlur={handleClothesNameBlur}
                  placeholder="Tabキーで補完"
                />
                {activeSuggestion && activeSuggestion.field === 'clothesName' && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '8px',
                    fontSize: '12px',
                    color: '#666',
                    zIndex: 1000
                  }}>
                    {activeSuggestion.index + 1}/{activeSuggestion.suggestions.length} 候補 (Tab: 次へ, Enter: 確定, Esc: キャンセル)
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">衣装タイトル</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-input"
                  value={formData.clothesTitle || ''}
                  onChange={(e) => handleInputChange('clothesTitle', e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'clothesTitle', suggestions.clothesTitles)}
                  placeholder="Tabキーで補完 (衣装名から自動コピー)"
                />
                {activeSuggestion && activeSuggestion.field === 'clothesTitle' && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '8px',
                    fontSize: '12px',
                    color: '#666',
                    zIndex: 1000
                  }}>
                    {activeSuggestion.index + 1}/{activeSuggestion.suggestions.length} 候補 (Tab: 次へ, Enter: 確定, Esc: キャンセル)
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">ポエムテキスト</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-input"
                  value={formData.text || ''}
                  onChange={(e) => handleInputChange('text', e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'text', suggestions.poemTexts)}
                  maxLength={100}
                  placeholder="Tabキーで補完"
                />
                {activeSuggestion && activeSuggestion.field === 'text' && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '8px',
                    fontSize: '12px',
                    color: '#666',
                    zIndex: 1000
                  }}>
                    {activeSuggestion.index + 1}/{activeSuggestion.suggestions.length} 候補 (Tab: 次へ, Enter: 確定, Esc: キャンセル)
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">ID</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  className="form-input"
                  value={formData.id || ''}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="例: CelestialColors_SakuragiMano"
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={async () => {
                    if (formData.clothesName && formData.idolName) {
                      setLoading(true)
                      try {
                        const response = await fetch('/api/generate-id', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            clothesName: formData.clothesName,
                            idolName: formData.idolName,
                            existingIds: suggestions.ids
                          })
                        })
                        const result = await response.json()
                        if (result.id) {
                          setFormData({ ...formData, id: result.id })
                        }
                      } catch (error) {
                        console.error('ID生成エラー:', error)
                        // フォールバック: 基本的な変換
                        const basicId = `${formData.clothesName.replace(/[^a-zA-Z0-9]/g, '')}_${formData.idolName.replace(/[^a-zA-Z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, '')}`
                        setFormData({ ...formData, id: basicId })
                      } finally {
                        setLoading(false)
                      }
                    }
                  }}
                  style={{ flexShrink: 0 }}
                  disabled={loading}
                >
                  スマート自動生成
                </button>
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                ※ シャニマスのアイドル名・衣装名を自動的に英語IDに変換します
              </div>
            </div>

            <div className="form-actions">
              {editingPoem && (
                <button
                  className="button button-secondary"
                  onClick={() => handleDelete(editingPoem)}
                  disabled={loading}
                  style={{ marginRight: 'auto' }}
                >
                  削除
                </button>
              )}
              <button
                className="button button-secondary"
                onClick={closeModal}
                disabled={loading}
              >
                キャンセル
              </button>
              <button
                className="button"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? '保存中...' : '保存'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}